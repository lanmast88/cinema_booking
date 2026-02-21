from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth import utils as auth_utils
from app.api.v1.auth.deps import get_current_user, require_role
from app.db.database import get_db
from app.models.models import User
from app.schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/auth", tags=["Auth"])


class TokenInfo(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post(
    "/register",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    summary="Регистрация нового пользователя",
)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> User:
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none() is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Пользователь с таким email уже существует.",
        )

    user = User(
        email=user_data.email,
        password_hash=auth_utils.hash_password(user_data.password),
        role="client",
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.post(
    "/login",
    response_model=TokenInfo,
    summary="Вход и получение JWT-токена",
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
) -> TokenInfo:
    """Поле `username` в форме используется как email пользователя."""
    unauthed_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Неверный email или пароль.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()

    if user is None or not auth_utils.validate_password(form_data.password, user.password_hash):
        raise unauthed_exc

    token = auth_utils.encode_jwt({"sub": user.email, "role": user.role})
    return TokenInfo(access_token=token)


@router.get(
    "/me",
    response_model=UserOut,
    summary="Информация о текущем пользователе",
)
async def get_me(
    current_user: User = Depends(get_current_user),
) -> User:
    return current_user


# ---------- Примеры использования ролевой защиты ----------

@router.get(
    "/admin-only",
    summary="Тестовый эндпоинт только для администраторов",
    dependencies=[Depends(require_role("admin"))],
)
async def admin_only() -> dict:
    return {"message": "Добро пожаловать, администратор!"}
