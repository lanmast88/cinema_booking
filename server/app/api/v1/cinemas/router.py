from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth.deps import require_role
from app.db.database import get_db
from app.models.models import Cinema, Hall, User
from app.schemas.cinema import CinemaCreate, CinemaOut, CinemaUpdate
from app.schemas.hall import HallOut

router = APIRouter(prefix="/cinemas", tags=["Cinemas"])


@router.get(
    "",
    response_model=list[CinemaOut],
    summary="Список всех кинотеатров",
)
async def get_cinemas(
    db: AsyncSession = Depends(get_db),
) -> list[Cinema]:
    result = await db.execute(select(Cinema))
    return result.scalars().all()


@router.get(
    "/{cinema_id}",
    response_model=CinemaOut,
    summary="Кинотеатр по ID",
)
async def get_cinema(
    cinema_id: int,
    db: AsyncSession = Depends(get_db),
) -> Cinema:
    cinema = await db.get(Cinema, cinema_id)
    if cinema is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кинотеатр не найден.")
    return cinema


@router.get(
    "/{cinema_id}/halls",
    response_model=list[HallOut],
    summary="Залы кинотеатра",
)
async def get_cinema_halls(
    cinema_id: int,
    db: AsyncSession = Depends(get_db),
) -> list[Hall]:
    cinema = await db.get(Cinema, cinema_id)
    if cinema is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кинотеатр не найден.")

    result = await db.execute(select(Hall).where(Hall.cinema_id == cinema_id))
    return result.scalars().all()


@router.post(
    "",
    response_model=CinemaOut,
    status_code=status.HTTP_201_CREATED,
    summary="Создать кинотеатр (только admin)",
)
async def create_cinema(
    cinema_data: CinemaCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Cinema:
    cinema = Cinema(name=cinema_data.name, address=cinema_data.address)
    db.add(cinema)
    await db.commit()
    await db.refresh(cinema)
    return cinema


@router.put(
    "/{cinema_id}",
    response_model=CinemaOut,
    summary="Обновить кинотеатр (только admin)",
)
async def update_cinema(
    cinema_id: int,
    cinema_data: CinemaUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Cinema:
    cinema = await db.get(Cinema, cinema_id)
    if cinema is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кинотеатр не найден.")

    for field, value in cinema_data.model_dump(exclude_unset=True).items():
        setattr(cinema, field, value)

    await db.commit()
    await db.refresh(cinema)
    return cinema


@router.delete(
    "/{cinema_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить кинотеатр (только admin)",
)
async def delete_cinema(
    cinema_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> None:
    cinema = await db.get(Cinema, cinema_id)
    if cinema is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Кинотеатр не найден.")

    await db.delete(cinema)
    await db.commit()
