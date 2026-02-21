from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth.deps import get_current_user, require_role
from app.db.database import get_db
from app.models.models import Movie, User
from app.schemas.movie import MovieCreate, MovieOut, MovieUpdate

router = APIRouter(prefix="/movies", tags=["Movies"])


@router.get(
    "",
    response_model=list[MovieOut],
    summary="Получить список всех фильмов",
)
async def get_movies(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
) -> list[Movie]:
    result = await db.execute(select(Movie).offset(skip).limit(limit))
    return result.scalars().all()


@router.get(
    "/{movie_id}",
    response_model=MovieOut,
    summary="Получить фильм по ID",
)
async def get_movie(
    movie_id: int,
    db: AsyncSession = Depends(get_db),
) -> Movie:
    result = await db.execute(select(Movie).where(Movie.id == movie_id))
    movie = result.scalar_one_or_none()
    if movie is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Фильм не найден.")
    return movie


@router.post(
    "",
    response_model=MovieOut,
    status_code=status.HTTP_201_CREATED,
    summary="Создать новый фильм (только admin)",
)
async def create_movie(
    movie_data: MovieCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Movie:
    movie = Movie(
        name=movie_data.name,
        description=movie_data.description,
        duration_min=movie_data.duration_min,
    )
    db.add(movie)
    await db.commit()
    await db.refresh(movie)
    return movie


@router.put(
    "/{movie_id}",
    response_model=MovieOut,
    summary="Обновить фильм (только admin)",
)
async def update_movie(
    movie_id: int,
    movie_data: MovieUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> Movie:
    result = await db.execute(select(Movie).where(Movie.id == movie_id))
    movie = result.scalar_one_or_none()
    if movie is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Фильм не найден.")

    for field, value in movie_data.model_dump(exclude_unset=True).items():
        setattr(movie, field, value)

    await db.commit()
    await db.refresh(movie)
    return movie


@router.delete(
    "/{movie_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить фильм (только admin)",
)
async def delete_movie(
    movie_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_role("admin")),
) -> None:
    result = await db.execute(select(Movie).where(Movie.id == movie_id))
    movie = result.scalar_one_or_none()
    if movie is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Фильм не найден.")

    await db.delete(movie)
    await db.commit()
