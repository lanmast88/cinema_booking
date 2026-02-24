"""
Скрипт заполнения БД тестовыми данными.
Запуск: uv run python seed.py
"""
import asyncio
from datetime import date, datetime, timedelta

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.api.v1.auth.utils import hash_password
from app.core.config import settings
from app.models.models import Cinema, Hall, Movie, Screening, User

engine = create_async_engine(settings.database_url)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

BASE = "https://ltayxcxhuhqbygbowzij.supabase.co/storage/v1/object/public/assets"


def make_start_time(day_offset: int, time_str: str) -> datetime:
    base = date.today() + timedelta(days=day_offset)
    hour, minute = map(int, time_str.split(":"))
    return datetime(base.year, base.month, base.day, hour, minute)


async def seed() -> None:
    async with AsyncSessionLocal() as db:

        # ── Кинотеатры ─────────────────────────────────────────────────────────
        cinema_star = Cinema(
            name="Cinema Star",
            address="ул. Арбат, 1",
            city="Москва",
            description="Современный кинотеатр в самом сердце Арбата. 7 залов с передовым оборудованием, IMAX, Dolby Atmos и VIP-зал с кожаными креслами.",
            image_urls=[
                f"{BASE}/cinema1.jpg",
                f"{BASE}/cinema1-1.jpg",
                f"{BASE}/cinema1-2.jpg",
            ],
            advantages=["ул. Арбат, 1", "IMAX · Dolby Atmos · VIP-зал", "Бар и лаундж на территории"],
        )
        nova_cinema = Cinema(
            name="Nova Cinema",
            address="Набережная, 5",
            city="Санкт-Петербург",
            description="Кинотеатр с видом на Неву. 7 уютных залов, широкий выбор форматов и особая атмосфера петербургского кино.",
            image_urls=[
                f"{BASE}/cinema2.jpg",
                f"{BASE}/cinema2-1.jpg",
                f"{BASE}/cinema2-2.jpg",
            ],
            advantages=["Набережная, 5", "Dolby · 3D · VIP-зал", "Панорамный бар на крыше"],
        )
        db.add_all([cinema_star, nova_cinema])
        await db.flush()

        # ── Залы Cinema Star ───────────────────────────────────────────────────
        cs_hall_defs = [
            ("Зал 1", 4, 10), ("Зал 2", 4, 10), ("Зал 3", 4, 10),
            ("Зал 4", 4, 10), ("Зал 5", 4, 10), ("Зал 6", 4, 10),
            ("VIP",   3,  8),
        ]
        cs_halls: dict[str, Hall] = {}
        for name, rows, seats in cs_hall_defs:
            h = Hall(cinema_id=cinema_star.id, name=name, rows=rows, seats_per_row=seats)
            db.add(h)
            cs_halls[name] = h

        # ── Залы Nova Cinema ───────────────────────────────────────────────────
        nc_hall_defs = [
            ("Зал 1", 4, 10), ("Зал 2", 4, 10), ("Зал 3", 4, 10),
            ("Зал 4", 4, 10), ("Зал 5", 4, 10), ("Зал 6", 4, 10),
            ("VIP",   3,  8),
        ]
        nc_halls: dict[str, Hall] = {}
        for name, rows, seats in nc_hall_defs:
            h = Hall(cinema_id=nova_cinema.id, name=name, rows=rows, seats_per_row=seats)
            db.add(h)
            nc_halls[name] = h

        await db.flush()

        hall_map: dict[tuple[str, str], Hall] = {
            **{("Cinema Star", k): v for k, v in cs_halls.items()},
            **{("Nova Cinema", k): v for k, v in nc_halls.items()},
        }

        # ── Фильмы ────────────────────────────────────────────────────────────
        # (название, описание, длительность_мин, poster_url)
        movies_raw = [
            ("Аватар: Пламя и пепел",                 "Фантастика, Приключения · 12+", 200, f"{BASE}/movie1.jpg"),
            ("Грозовой перевал",                       "Мелодрама, Драма · 16+",        150, f"{BASE}/movie2.webp"),
            ("На помощь!",                             "Триллер · 18+",                 130, f"{BASE}/movie3.webp"),
            ("Казнить нельзя помиловать",              "Триллер, Боевик, Детектив · 16+", 115, f"{BASE}/movie4.webp"),
            ("Горничная",                              "Триллер · 16+",                 145, f"{BASE}/movie5.webp"),
            ("Свист",                                  "Хоррор · 18+",                  110, f"{BASE}/movie6.webp"),
            ("Опасный дуэт",                           "Комедия, Боевик · 16+",         135, f"{BASE}/movie7.webp"),
            ("Возвращение в Сайлент Хилл",             "Хоррор · 16+",                  120, f"{BASE}/movie8.webp"),
            ("Зверополис 2",                           "Комедия, Мультфильм · 6+",      120, f"{BASE}/movie9child.webp"),
            ("Губка Боб: В поисках квадратных штанов", "Комедия, Мультфильм · 6+",      105, f"{BASE}/movie10child.webp"),
            ("Шрек",                                   "Комедия, Мультфильм · 6+",      125, f"{BASE}/movie11child.png"),
            ("Заклятие: Обряд реинкарнации",           "Хоррор · 18+",                  105, f"{BASE}/movie12.webp"),
        ]
        movie_map: dict[str, Movie] = {}
        for name, description, duration_min, poster_url in movies_raw:
            m = Movie(name=name, description=description, duration_min=duration_min, poster_url=poster_url)
            db.add(m)
            movie_map[name] = m

        await db.flush()

        # ── Сеансы ────────────────────────────────────────────────────────────
        # (название фильма, dayOffset, время, цена, зал, кинотеатр, формат)
        screenings_raw = [
            ("Аватар: Пламя и пепел",   0, "16:40",  600, "Зал 4", "Cinema Star", "2D"),
            ("Аватар: Пламя и пепел",   0, "19:30",  800, "Зал 1", "Cinema Star", "IMAX"),
            ("Аватар: Пламя и пепел",   1, "18:20",  650, "Зал 2", "Nova Cinema", "2D"),
            ("Аватар: Пламя и пепел",   2, "21:10",  700, "Зал 3", "Cinema Star", "Dolby"),
            ("Аватар: Пламя и пепел",   3, "23:30",  760, "VIP",   "Nova Cinema", "2D"),

            ("Грозовой перевал",        0, "14:10",  500, "Зал 5", "Nova Cinema", "2D"),
            ("Грозовой перевал",        1, "17:50",  650, "Зал 2", "Cinema Star", "2D"),
            ("Грозовой перевал",        2, "11:40",  520, "Зал 2", "Cinema Star", "2D"),
            ("Грозовой перевал",        3, "20:40",  700, "Зал 1", "Nova Cinema", "2D"),

            ("На помощь!",              0, "13:20",  580, "Зал 3", "Cinema Star", "2D"),
            ("На помощь!",              1, "18:40",  700, "Зал 4", "Nova Cinema", "Dolby"),
            ("На помощь!",              2, "22:10",  760, "Зал 6", "Cinema Star", "2D"),
            ("На помощь!",              3, "23:50",  820, "VIP",   "Nova Cinema", "2D"),

            ("Казнить нельзя помиловать", 0, "22:20", 750, "Зал 6", "Cinema Star", "2D"),
            ("Казнить нельзя помиловать", 1, "20:00", 700, "Зал 2", "Nova Cinema", "Dolby"),
            ("Казнить нельзя помиловать", 2, "23:10", 800, "VIP",   "Cinema Star", "2D"),
            ("Казнить нельзя помиловать", 3, "16:10", 640, "Зал 3", "Nova Cinema", "2D"),

            ("Горничная",               0, "12:00",  540, "Зал 2", "Nova Cinema", "2D"),
            ("Горничная",               1, "16:30",  630, "Зал 5", "Cinema Star", "2D"),
            ("Горничная",               2, "20:20",  710, "Зал 4", "Nova Cinema", "2D"),
            ("Горничная",               3, "22:40",  790, "VIP",   "Cinema Star", "Dolby"),

            ("Свист",                   0, "15:10",  610, "Зал 1", "Cinema Star", "2D"),
            ("Свист",                   1, "21:20",  760, "Зал 3", "Nova Cinema", "2D"),
            ("Свист",                   2, "23:15",  830, "Зал 2", "Cinema Star", "Dolby"),
            ("Свист",                   3, "10:40",  470, "Зал 5", "Nova Cinema", "2D"),

            ("Опасный дуэт",            0, "11:15",  500, "Зал 2", "Cinema Star", "2D"),
            ("Опасный дуэт",            1, "14:50",  620, "Зал 1", "Nova Cinema", "2D"),
            ("Опасный дуэт",            2, "19:40",  730, "Зал 4", "Cinema Star", "Dolby"),
            ("Опасный дуэт",            3, "21:55",  780, "Зал 6", "Nova Cinema", "2D"),

            ("Возвращение в Сайлент Хилл", 0, "18:00", 650, "Зал 3", "Nova Cinema", "2D"),
            ("Возвращение в Сайлент Хилл", 1, "12:30", 560, "Зал 3", "Cinema Star", "2D"),
            ("Возвращение в Сайлент Хилл", 2, "21:30", 780, "Зал 1", "Cinema Star", "2D"),
            ("Возвращение в Сайлент Хилл", 3, "23:40", 720, "Зал 4", "Nova Cinema", "2D"),

            ("Зверополис 2",            0, "10:20",  450, "Зал 5", "Nova Cinema", "2D"),
            ("Зверополис 2",            1, "13:10",  520, "Зал 2", "Cinema Star", "2D"),
            ("Зверополис 2",            2, "16:00",  590, "Зал 1", "Nova Cinema", "2D"),
            ("Зверополис 2",            3, "18:30",  640, "Зал 3", "Cinema Star", "2D"),

            ("Губка Боб: В поисках квадратных штанов", 0, "09:40", 430, "Зал 1", "Cinema Star", "2D"),
            ("Губка Боб: В поисках квадратных штанов", 1, "12:20", 500, "Зал 5", "Nova Cinema", "2D"),
            ("Губка Боб: В поисках квадратных штанов", 2, "15:10", 570, "Зал 3", "Cinema Star", "2D"),
            ("Губка Боб: В поисках квадратных штанов", 3, "17:20", 620, "Зал 2", "Nova Cinema", "2D"),

            ("Шрек",                    0, "11:00",  480, "Зал 2", "Nova Cinema", "2D"),
            ("Шрек",                    1, "14:30",  560, "Зал 4", "Cinema Star", "2D"),
            ("Шрек",                    2, "17:40",  620, "Зал 5", "Nova Cinema", "2D"),
            ("Шрек",                    3, "20:10",  680, "Зал 1", "Cinema Star", "2D"),

            ("Заклятие: Обряд реинкарнации", 0, "23:20", 820, "VIP",   "Nova Cinema", "Dolby"),
            ("Заклятие: Обряд реинкарнации", 1, "19:10", 680, "Зал 1", "Cinema Star", "2D"),
            ("Заклятие: Обряд реинкарнации", 2, "17:00", 590, "Зал 5", "Nova Cinema", "2D"),
            ("Заклятие: Обряд реинкарнации", 3, "22:00", 760, "Зал 2", "Cinema Star", "2D"),
        ]

        for movie_name, day_offset, time_str, price, hall_name, cinema_name, fmt in screenings_raw:
            screening = Screening(
                movie_id=movie_map[movie_name].id,
                hall_id=hall_map[(cinema_name, hall_name)].id,
                start_time=make_start_time(day_offset, time_str),
                price=price,
                format=fmt,
            )
            db.add(screening)

        # ── Пользователи ──────────────────────────────────────────────────────
        db.add(User(
            email="admin@cinema.com",
            password_hash=hash_password("admin123"),
            role="admin",
        ))
        db.add(User(
            email="user@cinema.com",
            password_hash=hash_password("user123"),
            role="client",
        ))

        await db.commit()

    print("✅ База данных успешно заполнена!")
    print("   Кинотеатры: Cinema Star (Москва), Nova Cinema (СПб)")
    print("   Фильмов:    12")
    print("   Сеансов:    48")
    print("   Admin:      admin@cinema.com  /  admin123")
    print("   User:       user@cinema.com   /  user123")


if __name__ == "__main__":
    asyncio.run(seed())
