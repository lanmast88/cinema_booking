from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import and_, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.v1.auth.deps import get_current_user, require_role
from app.core.logging import get_logger
from app.db.database import get_db
from app.models.models import Order, Screening, Ticket, User
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix="/orders", tags=["Orders"])
logger = get_logger(__name__)


def _load_tickets(query):
    """Хелпер: добавляет жадную загрузку tickets к запросу Order."""
    return query.options(selectinload(Order.tickets))


async def _get_order_or_404(order_id: int, db: AsyncSession) -> Order:
    result = await db.execute(
        _load_tickets(select(Order).where(Order.id == order_id))
    )
    order = result.scalar_one_or_none()
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден.")
    return order


@router.post(
    "",
    response_model=OrderOut,
    status_code=status.HTTP_201_CREATED,
    summary="Создать заказ и забронировать места",
)
async def create_order(
    order_data: OrderCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Order:
    # 1. Проверить что сеанс существует
    screening = await db.get(Screening, order_data.screening_id)
    if screening is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сеанс не найден.")

    # 2. Проверить что места не заняты
    seat_filters = [
        and_(Ticket.row_number == s.row_number, Ticket.seat_number == s.seat_number)
        for s in order_data.seats
    ]
    taken = await db.execute(
        select(Ticket).where(
            Ticket.screening_id == order_data.screening_id,
            or_(*seat_filters),
        )
    )
    if taken.scalars().first() is not None:
        logger.warning(
            "Места уже заняты — сеанс id=%d, пользователь id=%d",
            order_data.screening_id,
            current_user.id,
        )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Одно или несколько мест уже заняты.",
        )

    # 3. Создать Order
    order = Order(user_id=current_user.id, status="created")
    db.add(order)
    await db.flush()  # получаем order.id не делая commit

    # 4. Создать Ticket для каждого места
    for seat in order_data.seats:
        db.add(Ticket(
            order_id=order.id,
            screening_id=order_data.screening_id,
            row_number=seat.row_number,
            seat_number=seat.seat_number,
        ))

    # 5. UNIQUE(screening_id, row_number, seat_number) страхует от гонки
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        logger.warning(
            "Гонка при бронировании — сеанс id=%d, пользователь id=%d",
            order_data.screening_id,
            current_user.id,
        )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Одно или несколько мест уже заняты (конфликт).",
        )

    result = await db.execute(
        _load_tickets(select(Order).where(Order.id == order.id))
    )
    created_order = result.scalar_one()
    logger.info(
        "Заказ создан: id=%d, сеанс id=%d, пользователь id=%d, мест=%d",
        created_order.id,
        order_data.screening_id,
        current_user.id,
        len(order_data.seats),
    )
    return created_order


@router.post(
    "/{order_id}/pay",
    response_model=OrderOut,
    summary="Оплатить заказ (фейковая оплата)",
)
async def pay_order(
    order_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Order:
    order = await _get_order_or_404(order_id, db)

    if order.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Нет доступа к этому заказу.",
        )
    if order.status != "created":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Невозможно оплатить заказ со статусом '{order.status}'.",
        )

    order.status = "paid"
    await db.commit()
    await db.refresh(order)
    logger.info("Заказ оплачен: id=%d, пользователь id=%d", order.id, current_user.id)
    return order


@router.get(
    "/my",
    response_model=list[OrderOut],
    summary="Мои заказы",
)
async def get_my_orders(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[Order]:
    result = await db.execute(
        _load_tickets(
            select(Order).where(Order.user_id == current_user.id).offset(skip).limit(limit)
        )
    )
    return result.scalars().all()


@router.post(
    "/{order_id}/cancel",
    response_model=OrderOut,
    summary="Отменить заказ по ID (только admin)",
    dependencies=[Depends(require_role("admin"))],
)
async def cancel_order(
    order_id: int,
    db: AsyncSession = Depends(get_db),
) -> Order:
    order = await _get_order_or_404(order_id, db)

    if order.status == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Заказ уже отменён.",
        )

    order.status = "cancelled"
    await db.commit()
    await db.refresh(order)
    logger.info("Заказ отменён (admin): id=%d", order.id)
    return order


@router.get(
    "/screening/{screening_id}",
    response_model=list[OrderOut],
    summary="Заказы по сеансу (только admin)",
    dependencies=[Depends(require_role("admin"))],
)
async def get_orders_by_screening(
    screening_id: int,
    db: AsyncSession = Depends(get_db),
) -> list[Order]:
    screening = await db.get(Screening, screening_id)
    if screening is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сеанс не найден.")

    result = await db.execute(
        _load_tickets(
            select(Order)
            .join(Order.tickets)
            .where(Ticket.screening_id == screening_id)
            .distinct()
        )
    )
    return result.scalars().all()
