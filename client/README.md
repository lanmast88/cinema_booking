# Cinema Booking — Frontend

SPA‑фронтенд сервиса бронирования билетов в кино. Написан на **React 19** с **Vite** в качестве сборщика и **Tailwind CSS 4** для стилизации.

---

## Стек

| Технология | Версия | Назначение |
|---|---|---|
| React | 19 | UI-библиотека |
| Vite | 7 | Сборка, dev-сервер, HMR |
| React Router DOM | 7 | Клиентская маршрутизация |
| Tailwind CSS | 4 | Утилитарная стилизация |
| @headlessui/react | 2 | Доступные UI-примитивы (модалки, диалоги) |
| @heroicons/react | 2 | SVG-иконки |
| Axios | 1 | HTTP-клиент для работы с API |

---

## Быстрый старт

### Через Docker Compose (рекомендуется)

Фронтенд поднимается автоматически вместе с остальным стеком из корня репозитория:

```bash
docker compose up -d
```

Доступен на `http://localhost:5173`.

### Локально

```bash
# из папки client/
npm install
npm run dev
```

Убедитесь, что backend запущен и `VITE_API_URL` в `.env` указывает на него.

---

## Переменные окружения

Файл `client/.env`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

| Переменная | Описание |
|---|---|
| `VITE_API_URL` | Базовый URL REST API backend. Все Axios-запросы используют этот префикс |

---

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Запустить dev-сервер с HMR на `http://localhost:5173` |
| `npm run build` | Собрать продакшн-бандл в папку `dist/` |
| `npm run preview` | Предпросмотр продакшн-сборки локально |

---

## Структура проекта

```
client/
├── public/                   # Статические файлы, отдаются по корневому URL (/filename)
│   ├── movie13.jpg           # Постер «Интерстеллар»
│   └── movie14.jpg           # Постер «Дюна: Часть вторая»
│
├── src/
│   ├── api/                  # Axios-клиенты для взаимодействия с backend
│   │   ├── auth.js           # register, login, getMe
│   │   ├── cinemas.js        # getCinemas, getHallsByCinemaIds
│   │   ├── movies.js         # getMovies, getMovie, addMovie
│   │   └── screenings.js     # getScreenings, addScreening и др.
│   │
│   ├── assets/               # Изображения, импортируемые через Vite (хэшируются при сборке)
│   │   ├── movie1.jpg … movie12.webp   # Постеры фильмов
│   │   ├── cinema1.jpg …               # Фото кинотеатров
│   │   ├── techfeature1-3.jpg          # Технические преимущества
│   │   ├── community1-3.jpg            # Сообщество / атмосфера
│   │   ├── menu1-3.jpg                 # Меню / фудкорт
│   │   ├── rent1-1 … rent1-3.jpg      # Аренда залов
│   │   ├── logo.png                    # Логотип
│   │   └── Icons.jsx                   # SVG-иконки как React-компоненты
│   │
│   ├── components/           # Переиспользуемые компоненты
│   │   ├── Header.jsx        # Шапка с навигацией
│   │   ├── Footer.jsx        # Подвал
│   │   ├── BurgerMenu.jsx    # Мобильное меню
│   │   ├── InfoCard.jsx      # Карточка с информацией
│   │   ├── AuthContext.jsx   # Provider авторизации
│   │   ├── auth-context.js   # React Context для auth-состояния
│   │   └── useAuth.js        # Хук useAuth() для доступа к контексту
│   │
│   ├── features/
│   │   └── main/             # Фича главной страницы / расписания
│   │       ├── components/
│   │       │   ├── MovieScheduleSection.jsx  # Список фильмов с сеансами
│   │       │   ├── SeatPickerModal.jsx       # Модалка выбора мест в зале
│   │       │   ├── AdminSessionModal.jsx     # Модалка добавления сеанса (admin)
│   │       │   ├── DeleteMovieDialog.jsx     # Диалог удаления фильма (admin)
│   │       │   ├── CinemaCardsSection.jsx    # Карточки кинотеатров
│   │       │   ├── DataFilters.jsx           # Фильтры расписания
│   │       │   └── NoLoginModal.jsx          # Модалка «нужна авторизация»
│   │       ├── data/
│   │       │   └── scheduleMovies.js         # Статические данные расписания и конфиги форм
│   │       └── utils/
│   │           └── date.js                   # Утилиты работы с датами (dayOffset, форматирование)
│   │
│   ├── pages/                # Страницы приложения (по одному компоненту на маршрут)
│   │   ├── MainPage.jsx      # Главная: расписание, фильтры, кинотеатры
│   │   ├── AuthPage.jsx      # Авторизация и регистрация
│   │   ├── UserPage.jsx      # Личный кабинет, история заказов
│   │   ├── PromotionPage.jsx # Акции и спецпредложения
│   │   ├── EventsPage.jsx    # События и мероприятия
│   │   ├── SportPage.jsx     # Спортивные трансляции
│   │   ├── RentPage.jsx      # Аренда зала
│   │   ├── PaymentPage.jsx   # Страница оплаты
│   │   └── PlaceholderPage.jsx # Заглушка для неготовых страниц
│   │
│   ├── App.jsx               # Корневой компонент, конфигурация маршрутов
│   ├── main.jsx              # Точка входа React, монтирование в DOM
│   └── index.css             # Глобальные стили, директивы Tailwind
│
├── .env                      # Переменные окружения (VITE_API_URL)
├── index.html                # HTML-шаблон
└── package.json
```

---

## Маршруты

| URL | Страница | Описание |
|---|---|---|
| `/` | `MainPage` | Главная: расписание, фильтры, кинотеатры |
| `/auth` | `AuthPage` | Вход и регистрация |
| `/user` | `UserPage` | Личный кабинет |
| `/offers` | `PromotionPage` | Акции |
| `/events` | `EventsPage` | События |
| `/sport` | `SportPage` | Спорт |
| `/rent` | `RentPage` | Аренда зала |
| `/payment` | `PaymentPage` | Оплата |
| `/schedule` | → `/` | Редирект на главную |
| `*` | → `/` | Редирект на главную |

---

## Авторизация

Состояние авторизации хранится в `AuthContext` (`src/components/AuthContext.jsx`). JWT‑токен сохраняется в `localStorage`.

Доступ к данным авторизации в любом компоненте:

```jsx
import { useAuth } from "../components/useAuth";

const { user, token, isAdmin } = useAuth();
```

Роли: `client` (обычный пользователь) и `admin`. Администраторам доступны дополнительные элементы UI — кнопки добавления/редактирования фильмов и сеансов прямо на главной странице.

---

## Взаимодействие с API

Все запросы к backend идут через функции в `src/api/`. Базовый URL берётся из `VITE_API_URL`.

```js
// Пример: получить список фильмов
import { getMovies } from "../api/movies";

const { data } = await getMovies();
```

Запросы, требующие авторизации, автоматически подставляют токен из `localStorage`:

```js
const token = localStorage.getItem("token");
axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
```

---

## Продакшн-сборка

```bash
npm run build
```

Готовый бандл окажется в папке `dist/`. Для предпросмотра:

```bash
npm run preview
```

> При продакшн-сборке убедитесь, что `VITE_API_URL` указывает на реальный backend, а не `localhost`.
