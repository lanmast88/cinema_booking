from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth.deps import require_role
from app.db.database import get_db
from app.models.models import Cinema, Hall, User
from app.schemas.hall import HallCreate, HallOut, HallUpdate

router = APIRouter(prefix="/halls", tags=["Halls"])


@router.get(
    "",
    response_model=list[HallOut],
    summary="Список всех залов",
)
async def get_halls(
    db: AsyncSession = Depends(get_db),
) -> list[Hall]:
    result = await db.execute(select(Hall))
    return result.scalars().all()


@router.get(
    "/{hall_id}",
    response_model=HallOut,
    summary="Зал по ID",
)
async def get_hall(
    hall_id: int,
    db: AsyncSession = Depends(get_db),
) -> Hall:
    hall = await db.get(Hall, hall_id)
    if hall is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Зал не найден.")
    return hall


@router.post(
    "",
    response_model=HallOut,
    status_code=status.HTTP_201_CREATED,
    summary="Создать зал (только admin)",
)
async def create_hall(
    hall_data: HallCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Hall:
    cinema = await db.get(Cinema, hall_data.cinema_id)
    if cinema is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кинотеатр не найден.")

    hall = Hall(name=hall_data.name, cinema_id=hall_data.cinema_id)
    db.add(hall)
    await db.commit()
    await db.refresh(hall)
    return hall


@router.put(
    "/{hall_id}",
    response_model=HallOut,
    summary="Обновить зал (только admin)",
)
async def update_hall(
    hall_id: int,
    hall_data: HallUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Hall:
    hall = await db.get(Hall, hall_id)
    if hall is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Зал не найден.")

    for field, value in hall_data.model_dump(exclude_unset=True).items():
        setattr(hall, field, value)

    await db.commit()
    await db.refresh(hall)
    return hall


@router.delete(
    "/{hall_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить зал (только admin)",
)
async def delete_hall(
    hall_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> None:
    hall = await db.get(Hall, hall_id)
    if hall is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Зал не найден.")

    await db.delete(hall)
    await db.commit()
