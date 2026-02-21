from fastapi import FastAPI

from app.api.v1.auth import router as auth_router

app = FastAPI(
    title="Cinema Booking API",
    description="REST API для сервиса бронирования билетов в кино.",
    version="1.0.0",
)

app.include_router(auth_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
def root() -> dict:
    return {"status": "ok", "message": "Cinema Booking API работает"}
