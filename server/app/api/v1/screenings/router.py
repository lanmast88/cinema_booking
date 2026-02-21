from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth.deps import require_role
from app.db.database import get_db
from app.models.models import Hall, Movie, Screening, User
from app.schemas.screening import ScreeningCreate, ScreeningOut

router = APIRouter(prefix="/screenings", tags=["Screenings"])


@router.get(
    "",
    response_model=list[ScreeningOut],
    summary="Получить список всех сеансов",
)
async def get_screenings(
    db: AsyncSession = Depends(get_db),
) -> list[Screening]:
    result = await db.execute(select(Screening))
    return result.scalars().all()


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
