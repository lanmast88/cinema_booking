from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.auth import router as auth_router
from app.api.v1.cinemas import router as cinemas_router
from app.api.v1.halls import router as halls_router
from app.api.v1.movies import router as movies_router
from app.api.v1.orders import router as orders_router
from app.api.v1.screenings import router as screenings_router
from app.core.config import settings

app = FastAPI(
    title="Cinema Booking API",
    description="REST API для сервиса бронирования билетов в кино.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(cinemas_router, prefix="/api/v1")
app.include_router(halls_router, prefix="/api/v1")
app.include_router(movies_router, prefix="/api/v1")
app.include_router(screenings_router, prefix="/api/v1")
app.include_router(orders_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
def root() -> dict:
    return {"status": "ok", "message": "Cinema Booking API работает"}
