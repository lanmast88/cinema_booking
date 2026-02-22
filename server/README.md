# Cinema Booking — Backend

REST API для сервиса бронирования билетов в кино. Написан на **FastAPI** с асинхронным доступом к **PostgreSQL** через SQLAlchemy.

## Стек

| Технология | Версия |
|---|---|
| Python | 3.12 |
| FastAPI | 0.129 |
| SQLAlchemy (async) | 2.0 |
| PostgreSQL + asyncpg | — |
| Alembic | миграции |
| JWT (RS256) | аутентификация |

---

## Быстрый старт

### 1. Установить зависимости

```bash
cd server
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Настроить переменные окружения

Создать файл `server/.env` (или скопировать из примера):

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/cinema_db
CORS_ORIGINS=["http://localhost:5173"]
LOG_LEVEL=INFO
# LOG_FILE=logs/app.log
```

### 3. Сгенерировать RSA-ключи для JWT

```bash
mkdir -p app/certs
openssl genrsa -out app/certs/private.pem 2048
openssl rsa -in app/certs/private.pem -pubout -out app/certs/public.pem
```

### 4. Применить миграции

```bash
alembic upgrade head
```

### 5. Запустить сервер

```bash
uvicorn app.main:app --reload
```

API будет доступен на `http://localhost:8000`.
Интерактивная документация: `http://localhost:8000/docs`.

---

## Переменные окружения

| Переменная | Обязательна | По умолчанию | Описание |
|---|---|---|---|
| `DATABASE_URL` | да | — | DSN для подключения к PostgreSQL (`postgresql+asyncpg://...`) |
| `CORS_ORIGINS` | нет | `["http://localhost:5173"]` | Список разрешённых origins для фронтенда (JSON-массив) |
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
│   └── main.py          # Точка входа: FastAPI app, middleware, exception handler
├── alembic/             # Миграции базы данных
├── alembic.ini
└── requirements.txt
```

---

## API

Полная интерактивная документация доступна в Swagger UI по адресу `/docs` после запуска сервера.

### Роутеры

| Префикс | Тег | Описание |
|---|---|---|
| `/api/v1/auth` | Auth | Регистрация, вход, текущий пользователь |
| `/api/v1/cinemas` | Cinemas | CRUD кинотеатров |
| `/api/v1/halls` | Halls | CRUD залов кинотеатра |
| `/api/v1/movies` | Movies | CRUD фильмов |
| `/api/v1/screenings` | Screenings | Сеансы, схема мест зала |
| `/api/v1/orders` | Orders | Бронирование, оплата, отмена заказов |

### Аутентификация

Используется **JWT (RS256)**. После входа (`POST /api/v1/auth/login`) клиент получает токен и передаёт его в заголовке:

```
Authorization: Bearer <token>
```

Роли: `client` (обычный пользователь) и `admin`. Эндпоинты только для администратора помечены в документации.

---

## Миграции

```bash
# Применить все миграции
alembic upgrade head

# Создать новую миграцию после изменения моделей
alembic revision --autogenerate -m "описание"

# Откатить последнюю миграцию
alembic downgrade -1

# Текущее состояние БД
alembic current
```
