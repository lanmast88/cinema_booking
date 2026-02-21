from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

from app.core.config import auth_jwt


def encode_jwt(
    payload: dict,
    private_key: str | None = None,
    algorithm: str = auth_jwt.algorithm,
    expire_minutes: int = auth_jwt.access_token_expire_minutes,
) -> str:
    if private_key is None:
        private_key = auth_jwt.private_key_path.read_text()

    to_encode = payload.copy()
    now = datetime.now(timezone.utc)
    expire = now + timedelta(minutes=expire_minutes)
    to_encode.update(exp=expire, iat=now)
    return jwt.encode(to_encode, private_key, algorithm=algorithm)


def decode_jwt(
    token: str | bytes,
    public_key: str | None = None,
    algorithm: str = auth_jwt.algorithm,
) -> dict:
    if public_key is None:
        public_key = auth_jwt.public_key_path.read_text()

    return jwt.decode(token, public_key, algorithms=[algorithm])


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()


def validate_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())
