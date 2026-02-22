import time

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.auth import router as auth_router
from app.api.v1.cinemas import router as cinemas_router
from app.api.v1.halls import router as halls_router
from app.api.v1.movies import router as movies_router
from app.api.v1.orders import router as orders_router
from app.api.v1.screenings import router as screenings_router
from app.core.config import settings
from app.core.logging import get_logger, setup_logging

setup_logging(log_level=settings.log_level, log_file=settings.log_file)

logger = get_logger(__name__)

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


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed_ms = (time.perf_counter() - start) * 1000
    logger.info(
        "%s %s — %d (%.1f ms)",
        request.method,
        request.url.path,
        response.status_code,
        elapsed_ms,
    )
    return response


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception(
        "Необработанное исключение: %s %s — %s",
        request.method,
        request.url.path,
        exc,
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Внутренняя ошибка сервера."},
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
