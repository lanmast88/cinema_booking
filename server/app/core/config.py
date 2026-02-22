from pathlib import Path

from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).parent.parent


class Settings(BaseSettings):
    """Настройки приложения, читаются из .env."""

    database_url: str
    cors_origins: list[str] = ["http://localhost:5173"]
    log_level: str = "INFO"
    log_file: str | None = None

    model_config = SettingsConfigDict(env_file=BASE_DIR.parent / ".env", extra="ignore")


class AuthJWT(BaseModel):
    """Параметры JWT-аутентификации."""

    private_key_path: Path = BASE_DIR / "certs" / "private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "public.pem"
    algorithm: str = "RS256"
    access_token_expire_minutes: int = 30


settings = Settings()
auth_jwt = AuthJWT()
