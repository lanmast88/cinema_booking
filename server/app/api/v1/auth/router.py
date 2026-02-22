from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth import utils as auth_utils
from app.api.v1.auth.deps import get_current_user, require_role
from app.core.logging import get_logger
from app.db.database import get_db
from app.models.models import User
from app.schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/auth", tags=["Auth"])
logger = get_logger(__name__)


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
        logger.warning("Попытка регистрации с уже занятым email: %s", user_data.email)
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
    logger.info("Новый пользователь зарегистрирован: %s (id=%d)", user.email, user.id)
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
        logger.warning("Неудачная попытка входа для email: %s", form_data.username)
        raise unauthed_exc

    logger.info("Вход выполнен: %s (id=%d, role=%s)", user.email, user.id, user.role)
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

@router.get(
    "/admin-only",
    summary="Тестовый эндпоинт только для администраторов",
    dependencies=[Depends(require_role("admin"))],
)
async def admin_only() -> dict:
    return {"message": "Добро пожаловать, администратор!"}
