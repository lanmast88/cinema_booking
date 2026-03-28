# Cinema Booking — Backend

REST API для сервиса бронирования билетов в кино. Написан на **FastAPI** с асинхронным доступом к **PostgreSQL** через SQLAlchemy.

## Стек

| Технология | Версия |
|---|---|
| Python | 3.12 |
| FastAPI | 0.129 |
| SQLAlchemy (async) | 2.0 |
| PostgreSQL + asyncpg | 16 |
| Alembic | миграции |
| JWT (RS256) | аутентификация |
| uv | менеджер зависимостей |

---

## Быстрый старт (через Docker Compose)

Рекомендуемый способ — запуск всего стека через Docker из корня репозитория. Подробная инструкция в корневом `README.md`.

```bash
# из корня проекта
docker compose up -d
docker compose exec backend uv run python seed.py
```

---

## Локальный запуск без Docker

### 1. Установить зависимости

Проект использует [uv](https://docs.astral.sh/uv/) для управления зависимостями.

```bash
# Установить uv (если ещё не установлен)
curl -LsSf https://astral.sh/uv/install.sh | sh

cd server
uv sync          # создаёт .venv и устанавливает все зависимости из pyproject.toml
```

### 2. Настроить переменные окружения

Создать файл `server/.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/cinema_booking
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
LOG_LEVEL=INFO
# LOG_FILE=logs/app.log
```

> При запуске через Docker Compose хост БД — `db` (не `localhost`).

### 3. Создать базу данных

```bash
psql -U postgres -c "CREATE DATABASE cinema_booking;"
```

### 4. Применить миграции

```bash
uv run alembic upgrade head
```

### 5. Заполнить тестовыми данными

```bash
uv run python seed.py
```

Создаёт:
- 2 кинотеатра, 14 залов
- 14 фильмов, 56 сеансов на ближайшие 4 дня
- Пользователей: `admin@cinema.com` / `admin123`, `user@cinema.com` / `user123`

### 6. Запустить сервер

```bash
uv run uvicorn app.main:app --reload
```

API доступен на `http://localhost:8000`.
Swagger UI: `http://localhost:8000/docs`.

---

## Переменные окружения

| Переменная | Обязательна | По умолчанию | Описание |
|---|---|---|---|
| `DATABASE_URL` | да | — | DSN для PostgreSQL (`postgresql+asyncpg://user:pass@host:port/db`). Для Docker хост — `db`, для локального запуска — `localhost` |
| `CORS_ORIGINS` | нет | `["http://localhost:5173"]` | JSON-массив разрешённых origins фронтенда |
| `LOG_LEVEL` | нет | `INFO` | Уровень логирования: `DEBUG`, `INFO`, `WARNING`, `ERROR` |
| `LOG_FILE` | нет | — | Путь к файлу логов. Если не задан — только консоль |

---

## Структура проекта

```
server/
├── app/
│   ├── api/v1/          # Роутеры (auth, cinemas, halls, movies, screenings, orders)
│   ├── core/
│   │   ├── config.py    # Настройки через pydantic-settings
│   │   └── logging.py   # Настройка логирования
│   ├── db/
│   │   └── database.py  # Async-движок SQLAlchemy, get_db dependency
│   ├── models/
│   │   └── models.py    # ORM-модели: User, Cinema, Hall, Movie, Screening, Order, Ticket
│   ├── schemas/         # Pydantic-схемы запросов и ответов
│   ├── certs/           # RSA-ключи для JWT (private.pem, public.pem)
│   └── main.py          # Точка входа: FastAPI app, middleware, CORS
├── alembic/             # Миграции базы данных
├── alembic.ini
├── seed.py              # Скрипт заполнения БД тестовыми данными
├── pyproject.toml       # Зависимости проекта
└── uv.lock
```

---

## API

Полная интерактивная документация доступна в Swagger UI по адресу `/docs` после запуска сервера.

### Роутеры

| Префикс | Тег | Описание |
|---|---|---|
| `/api/v1/auth` | Auth | Регистрация, вход, текущий пользователь |
| `/api/v1/cinemas` | Cinemas | CRUD кинотеатров; залы по кинотеатру |
| `/api/v1/movies` | Movies | CRUD фильмов |
| `/api/v1/screenings` | Screenings | Сеансы, схема мест зала, проверка занятости |
| `/api/v1/orders` | Orders | Бронирование, оплата, отмена заказов |

### Аутентификация

Используется **JWT (RS256)**. После входа (`POST /api/v1/auth/login`) клиент получает токен и передаёт его в заголовке:

```
Authorization: Bearer <token>
```

Роли: `client` (обычный пользователь) и `admin`. Эндпоинты только для администратора защищены соответствующей зависимостью.

---

## Миграции

```bash
# Применить все миграции
uv run alembic upgrade head

# Создать новую миграцию после изменения моделей
uv run alembic revision --autogenerate -m "описание"

# Откатить последнюю миграцию
uv run alembic downgrade -1

# Текущее состояние БД
uv run alembic current
```

---

## Сброс базы данных

### Через Docker (рекомендуется)

```bash
docker compose down -v          # удалить контейнеры и volume с данными
docker compose up -d            # поднять заново (миграции применятся автоматически)
docker compose exec backend uv run python seed.py
```

### Локально

```bash
psql -U postgres -c "DROP DATABASE cinema_booking;"
psql -U postgres -c "CREATE DATABASE cinema_booking;"
uv run alembic upgrade head
uv run python seed.py
```
