from datetime import date, datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.v1.auth.deps import require_role
from app.db.database import get_db
from app.models.models import Hall, Movie, Screening, Ticket, User
from app.schemas.screening import ScreeningCreate, ScreeningOut, ScreeningUpdate

router = APIRouter(prefix="/screenings", tags=["Screenings"])


async def _check_hall_overlap(
    db: AsyncSession,
    hall_id: int,
    start_time: datetime,
    duration_min: int,
    exclude_id: int | None = None,
) -> None:
    """Проверяет, не пересекается ли новый сеанс с уже существующими в том же зале."""
    end_time = start_time + timedelta(minutes=duration_min)

    query = (
        select(Screening)
        .options(selectinload(Screening.movie))
        .where(
            Screening.hall_id == hall_id,
            Screening.start_time < end_time,
        )
    )
    if exclude_id is not None:
        query = query.where(Screening.id != exclude_id)

    result = await db.execute(query)
    candidates = result.scalars().all()

    for s in candidates:
        s_end = s.start_time + timedelta(minutes=s.movie.duration_min)
        if s_end > start_time:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    f"Сеанс пересекается с уже существующим сеансом (id={s.id}): "
                    f"{s.start_time.strftime('%d.%m.%Y %H:%M')}–{s_end.strftime('%H:%M')}."
                ),
            )


class SeatStatus(BaseModel):
    row_number: int
    seat_number: int


class SeatsOut(BaseModel):
    screening_id: int
    hall_id: int
    rows: int
    seats_per_row: int
    taken_seats: list[SeatStatus]


@router.get(
    "",
    response_model=list[ScreeningOut],
    summary="Список сеансов с фильтрацией по фильму и дате",
)
async def get_screenings(
    movie_id: int | None = Query(default=None, description="ID фильма"),
    date: date | None = Query(default=None, description="Дата сеанса (YYYY-MM-DD)"),
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
) -> list[Screening]:
    query = select(Screening)

    if movie_id is not None:
        query = query.where(Screening.movie_id == movie_id)

    if date is not None:
        query = query.where(
            Screening.start_time >= date,
            Screening.start_time < date + timedelta(days=1),
        )

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


@router.get(
    "/{screening_id}/seats",
    response_model=SeatsOut,
    summary="Схема мест зала: занятые и размерность",
)
async def get_screening_seats(
    screening_id: int,
    db: AsyncSession = Depends(get_db),
) -> SeatsOut:
    screening = await db.get(Screening, screening_id)
    if screening is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сеанс не найден.")

    hall = await db.get(Hall, screening.hall_id)

    result = await db.execute(
        select(Ticket).where(Ticket.screening_id == screening_id)
    )
    taken = result.scalars().all()

    return SeatsOut(
        screening_id=screening_id,
        hall_id=hall.id,
        rows=hall.rows,
        seats_per_row=hall.seats_per_row,
        taken_seats=[
            SeatStatus(row_number=t.row_number, seat_number=t.seat_number)
            for t in taken
        ],
    )


@router.get(
    "/{screening_id}",
    response_model=ScreeningOut,
    summary="Получить сеанс по ID",
)
async def get_screening(
    screening_id: int,
    db: AsyncSession = Depends(get_db),
) -> Screening:
    result = await db.execute(select(Screening).where(Screening.id == screening_id))
    screening = result.scalar_one_or_none()
    if screening is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сеанс не найден.")
    return screening


@router.put(
    "/{screening_id}",
    response_model=ScreeningOut,
    summary="Обновить сеанс (только admin)",
)
async def update_screening(
    screening_id: int,
    screening_data: ScreeningUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Screening:
    result = await db.execute(select(Screening).where(Screening.id == screening_id))
    screening = result.scalar_one_or_none()
    if screening is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сеанс не найден.")

    if screening_data.start_time is not None:
        movie = await db.get(Movie, screening.movie_id)
        await _check_hall_overlap(
            db,
            hall_id=screening.hall_id,
            start_time=screening_data.start_time,
            duration_min=movie.duration_min,
            exclude_id=screening_id,
        )

    for field, value in screening_data.model_dump(exclude_unset=True).items():
        setattr(screening, field, value)

    await db.commit()
    await db.refresh(screening)
    return screening


@router.delete(
    "/{screening_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить сеанс (только admin)",
)
async def delete_screening(
    screening_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> None:
    result = await db.execute(select(Screening).where(Screening.id == screening_id))
    screening = result.scalar_one_or_none()
    if screening is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сеанс не найден.")

    await db.delete(screening)
    await db.commit()


@router.post(
    "",
    response_model=ScreeningOut,
    status_code=status.HTTP_201_CREATED,
    summary="Создать сеанс для фильма (только admin)",
)
async def create_screening(
    screening_data: ScreeningCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Screening:
    movie = await db.get(Movie, screening_data.movie_id)
    if movie is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Фильм не найден.")

    hall = await db.get(Hall, screening_data.hall_id)
    if hall is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Зал не найден.")

    await _check_hall_overlap(
        db,
        hall_id=screening_data.hall_id,
        start_time=screening_data.start_time,
        duration_min=movie.duration_min,
    )

    screening = Screening(
        movie_id=screening_data.movie_id,
        hall_id=screening_data.hall_id,
        start_time=screening_data.start_time,
        price=screening_data.price,
    )
    db.add(screening)
    await db.commit()
    await db.refresh(screening)
    return screening
