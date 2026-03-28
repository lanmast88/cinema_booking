## Cinema Booking — сервис бронирования билетов в кино

Многостраничное веб‑приложение для поиска кинотеатров и фильмов, выбора сеансов и интерактивного бронирования мест в зале. Проект разделён на современный SPA‑фронтенд (React + Vite) и высокопроизводительный REST API (FastAPI + PostgreSQL).

---

## Содержание

1. [Общая информация](#общая-информация)
2. [Функциональность](#функциональность)
3. [Технологический стек](#технологический-стек)
4. [Архитектура и структура репозитория](#архитектура-и-структура-репозитория)
5. [Запуск проекта](#запуск-проекта)
   - [Способ 1 — Docker Compose (рекомендуется)](#способ-1--docker-compose-рекомендуется)
   - [Способ 2 — локально без Docker](#способ-2--локально-без-docker)
6. [Переменные окружения](#переменные-окружения)
7. [API](#api)
8. [UI и пользовательский сценарий](#ui-и-пользовательский-сценарий)
9. [Скриншоты](#скриншоты)
10. [Диаграммы](#диаграммы)
11. [Тестирование](#тестирование)
12. [Планы по развитию](#планы-по-развитию)

---

## Общая информация

**Cinema Booking** решает задачу онлайн‑бронирования билетов в кинотеатр:

- **пользователь** просматривает список кинотеатров и фильмов, выбирает сеанс и конкретные места в зале;
- **система** хранит информацию о кинотеатрах, залах, фильмах, сеансах и заказах, проверяет доступность мест и предотвращает двойное бронирование;
- **администратор** (через отдельные эндпоинты API) управляет справочниками: кинотеатры, залы, фильмы, расписание, цены.

Проект может использоваться как:

- учебный пример полнофункционального SPA + REST API;
- демонстрация навыков работы с React, FastAPI, PostgreSQL, архитектурой клиент‑сервер.

---

## Функциональность

- **Каталог кинотеатров и фильмов**
  - просмотр списка кинотеатров, залов и текущего репертуара;
  - фильтрация по городу, кинотеатру, дате и фильму.

- **Расписание сеансов**
  - отображение доступных сеансов по выбранному фильму/кинотеатру;
  - работа с часовыми поясами и датами показа.

- **Интерактивное бронирование мест**
  - визуальная схема зала с разметкой рядов и мест;
  - отображение занятых/свободных мест;
  - проверка коллизий бронирования на уровне сервера.

- **Работа с заказами**
  - создание заказа на основе выбранных мест;
  - статус заказа (создан, оплачен, отменён);
  - возможность дальнейшей интеграции с платёжными системами.

- **Аутентификация и авторизация**
  - REST‑эндпоинты для регистрации/логина;
  - JWT‑аутентификация (RS256) на backend;
  - роли `client` и `admin`.

Дополнительные детали по backend см. в `server/README.md`.

---

## Технологический стек

- **Frontend**
  - **React** 19 (SPA)
  - **Vite** 7 (сборка и dev‑сервер)
  - **React Router DOM** 7 (маршрутизация)
  - **Tailwind CSS** 4 + UI‑компоненты (`@headlessui/react`, `@heroicons/react`)
  - **Axios** — HTTP‑клиент для общения с API

- **Backend**
  - **Python** 3.12
  - **FastAPI** 0.129 — основной веб‑фреймворк
  - **SQLAlchemy (async)** 2.x — ORM и работа с PostgreSQL
  - **PostgreSQL 16 + asyncpg** — основная БД
  - **Alembic** — миграции схемы БД
  - **Pydantic / pydantic‑settings** — валидация данных и конфигурация
  - **Uvicorn** — ASGI‑сервер
  - **uv** — менеджер зависимостей Python

- **Инфраструктура**
  - **Docker + Docker Compose** — оркестрация всех сервисов
  - CORS настроен для фронтенда на `http://localhost:5173`

---

## Архитектура и структура репозитория

```text
cinema_booking_project/
├── client/                   # SPA-фронтенд на React + Vite
│   ├── public/               # Статические файлы (доступны по корневому URL)
│   ├── src/
│   │   ├── assets/           # Изображения, иконки
│   │   ├── components/       # Переиспользуемые UI-компоненты (Header, Footer и др.)
│   │   ├── features/         # Фичи по доменам (main, auth и др.)
│   │   ├── pages/            # Страницы приложения
│   │   └── api/              # Axios-клиенты для взаимодействия с API
│   ├── .env                  # Переменные окружения фронтенда
│   └── package.json
│
├── server/                   # REST API на FastAPI
│   ├── app/
│   │   ├── api/v1/           # Роутеры: auth, cinemas, halls, movies, screenings, orders
│   │   ├── core/             # Конфигурация, логирование
│   │   ├── db/               # Подключение к БД (AsyncSession, engine)
│   │   ├── models/           # ORM-модели
│   │   ├── schemas/          # Pydantic-схемы запросов/ответов
│   │   └── main.py           # Точка входа приложения FastAPI
│   ├── alembic/              # Миграции БД
│   ├── seed.py               # Скрипт заполнения БД тестовыми данными
│   ├── pyproject.toml        # Зависимости проекта (uv)
│   ├── .env                  # Переменные окружения backend
│   └── README.md
│
├── docker-compose.yml        # Оркестрация: db + backend + frontend
└── README.md                 # Этот файл
```

На уровне HTTP:

- фронтенд обращается к API по адресу `http://localhost:8000/api/v1/...`;
- backend предоставляет Swagger UI по адресу `http://localhost:8000/docs`;
- CORS настроен для `http://localhost:5173` и `http://localhost:3000`.

---

## Запуск проекта

### Способ 1 — Docker Compose (рекомендуется)

Самый простой способ: поднимает PostgreSQL, backend и frontend одной командой.

#### Требования

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (включает Docker Compose)

#### Шаг 1 — Клонировать репозиторий

```bash
git clone <url-репозитория>
cd cinema_booking_project
```

#### Шаг 2 — Проверить файл `server/.env`

Файл уже должен присутствовать. Убедитесь, что в нём такое содержимое:

```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/cinema_booking
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
LOG_LEVEL=INFO
```

> Хост БД — `db` (имя сервиса в Docker Compose, не `localhost`).

#### Шаг 3 — Запустить все сервисы

```bash
docker compose up -d
```

Docker Compose автоматически:
- поднимет PostgreSQL на порту `5433` (хост) / `5432` (внутри сети);
- запустит backend на `http://localhost:8000` и применит миграции Alembic;
- запустит frontend на `http://localhost:5173`.

Дождитесь, пока все контейнеры станут `healthy` / `running`:

```bash
docker compose ps
```

#### Шаг 4 — Заполнить БД тестовыми данными

```bash
docker compose exec backend uv run python seed.py
```

Скрипт создаст:
- 2 кинотеатра (Cinema Star — Москва, Nova Cinema — СПб)
- 14 фильмов с постерами
- 56 сеансов на ближайшие 4 дня
- Тестовых пользователей:
  - `admin@cinema.com` / `admin123` (администратор)
  - `user@cinema.com` / `user123` (обычный пользователь)

#### Шаг 5 — Открыть приложение

| Сервис | URL |
|---|---|
| Фронтенд | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |

---

#### Управление контейнерами

```bash
# Остановить все сервисы (данные БД сохранятся)
docker compose stop

# Запустить снова
docker compose start

# Полностью удалить контейнеры и данные БД
docker compose down -v

# Пересобрать образы после изменений в коде
docker compose up -d --build

# Просмотр логов
docker compose logs -f backend
docker compose logs -f frontend
```

#### Сброс и повторное заполнение БД

```bash
docker compose down -v          # удалить контейнеры и volume с данными
docker compose up -d            # поднять заново (миграции применятся автоматически)
# подождать ~15 секунд
docker compose exec backend uv run python seed.py
```

---

### Способ 2 — локально без Docker

Используется при разработке, если Docker недоступен.

#### Требования

- **Node.js** 18+ (рекомендуется LTS)
- **Python** 3.12
- **PostgreSQL** 16 (запущен локально)
- **uv** — менеджер пакетов Python:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

#### Backend

```bash
cd server

# 1. Установить зависимости
uv sync

# 2. Настроить .env — изменить хост БД с "db" на "localhost"
# DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/cinema_booking

# 3. Создать БД в PostgreSQL (если ещё не создана)
psql -U postgres -c "CREATE DATABASE cinema_booking;"

# 4. Применить миграции
uv run alembic upgrade head

# 5. Заполнить тестовыми данными
uv run python seed.py

# 6. Запустить сервер
uv run uvicorn app.main:app --reload
```

API будет на `http://localhost:8000`.

#### Frontend

```bash
cd client

# 1. Установить зависимости
npm install

# 2. Убедиться, что .env указывает на локальный backend
# VITE_API_URL=http://localhost:8000/api/v1

# 3. Запустить dev-сервер
npm run dev
```

Фронтенд будет на `http://localhost:5173`.

---

## Переменные окружения

### Backend (`server/.env`)

| Переменная | Обязательна | Описание |
|---|---|---|
| `DATABASE_URL` | да | DSN для PostgreSQL. Для Docker: `postgresql+asyncpg://postgres:postgres@db:5432/cinema_booking`. Для локального запуска: `@localhost:5432/...` |
| `CORS_ORIGINS` | нет | JSON-массив разрешённых origins. По умолчанию: `["http://localhost:5173"]` |
| `LOG_LEVEL` | нет | Уровень логирования: `DEBUG`, `INFO`, `WARNING`, `ERROR`. По умолчанию: `INFO` |
| `LOG_FILE` | нет | Путь к файлу логов. Если не задан — только консоль |

### Frontend (`client/.env`)

| Переменная | Описание |
|---|---|
| `VITE_API_URL` | Базовый URL API. По умолчанию: `http://localhost:8000/api/v1` |

---

## API

- **Базовый URL**: `http://localhost:8000/api/v1`
- **Swagger UI**: `http://localhost:8000/docs`

| Префикс | Описание |
|---|---|
| `/auth` | Регистрация, вход, текущий пользователь |
| `/cinemas` | CRUD кинотеатров и залов |
| `/movies` | CRUD фильмов |
| `/screenings` | Сеансы, схема мест зала |
| `/orders` | Бронирование, оплата, отмена заказов |

### Аутентификация

Схема: **JWT Bearer (RS256)**. После входа клиент передаёт токен в заголовке:

```http
Authorization: Bearer <jwt-token>
```

---

## UI и пользовательский сценарий

- **Главная / Расписание** — список фильмов, сеансы по датам, фильтрация
- **Модалка фильма** — схема зала, выбор мест, оформление заказа
- **Акции** — текущие спецпредложения
- **События / Спорт** — трансляции и спортивные мероприятия
- **Аренда зала** — бронирование зала для частных мероприятий
- **Личный кабинет** — история заказов

---

## Скриншоты

- **Скриншоты 1, 2, 3** — Страница Расписание / Главная;
<img width="3420" height="1972" alt="image" src="https://github.com/user-attachments/assets/c91c2d8d-08d9-4bf9-825f-644528709a6a" />
<img width="3420" height="1972" alt="image" src="https://github.com/user-attachments/assets/019d11cf-f683-4da1-b588-f8d1a7d29a88" />
<img width="3420" height="1972" alt="image" src="https://github.com/user-attachments/assets/2bab21ff-c5b4-4c31-a9d3-6bda32e5ef28" />

- **Скриншот 4** — Модалка фильма - схема зала и выбор мест;
<img width="3420" height="1972" alt="image" src="https://github.com/user-attachments/assets/167c0b5e-d159-48ad-8014-46badb7eb4c5" />

- **Скриншот 5** — Модалка фильма - схема зала и выбор мест;
<img width="3420" height="2194" alt="image" src="https://github.com/user-attachments/assets/dc62ea7c-d92a-4a0b-b5bc-3c405dc0ccea" />

- **Скриншот 6** — Страница События;
<img width="3420" height="2474" alt="image" src="https://github.com/user-attachments/assets/92c078db-e6ed-4006-bc0b-709a1bd2d1b0" />

- **Скриншот 7** — Страница Спорт;
<img width="3420" height="5030" alt="image" src="https://github.com/user-attachments/assets/6edaad1e-41b7-43ae-9bbe-f52d51f69736" />

- **Скриншот 8** — Страница Аренда зала;
<img width="3420" height="4576" alt="image" src="https://github.com/user-attachments/assets/ec8bde66-8743-4497-b0bc-9379d3793fc9" />

- **Скриншот 9** — Страница Аренда зала;
<img width="3420" height="2364" alt="image" src="https://github.com/user-attachments/assets/b2c6c411-c8af-49d5-a344-953a2b24708c" />

- **Скриншот 10** — Страница Личный кабинет;
<img width="3420" height="1972" alt="image" src="https://github.com/user-attachments/assets/5d7a39c1-6361-4377-b058-e6d9858ce617" />

---

## Диаграммы

- **ER диаграмма**
<img width="745" height="908" alt="image" src="https://github.com/user-attachments/assets/4096fd1e-80b6-4026-b58d-7a68ffd19a59" />

- **Use Case**
<img width="1948" height="1201" alt="Untitled Diagram drawio (1)" src="https://github.com/user-attachments/assets/668f0155-3ec4-45a6-aa84-f424f88eb574" />

- **User Story Map**
<img width="1251" height="551" alt="Untitled Diagram drawio (3)" src="https://github.com/user-attachments/assets/ccfe0d2d-1fbf-44a1-a460-3d0a4f7e0eaf" />

---

## Тестирование

Возможные направления:

- **Backend** — юнит‑тесты на бизнес‑логику; интеграционные тесты API через `httpx`/`pytest` с тестовой БД.
- **Frontend** — snapshot‑тесты и тесты компонентов через `Vitest` + `Testing Library`; e2e‑тесты через Playwright.

---

## Планы по развитию

- **Интеграция оплаты** (Stripe/ЮKassa и др.).
- **Роли и права** для админ‑панели, управление репертуаром через UI.
- **Система промокодов и персонализированных акций**.
- **Локализация** интерфейса (RU/EN) и сообщений об ошибках.
- **Мониторинг и алертинг** (Prometheus/Grafana, Sentry и т.п.).
