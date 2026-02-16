import { useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import cinema1Main from "../assets/cinema1.jpg";
import cinema1Alt1 from "../assets/cinema1-1.jpg";
import cinema1Alt2 from "../assets/cinema1-2.jpg";
import cinema2Main from "../assets/cinema2.jpg";
import cinema2Alt1 from "../assets/cinema2-1.jpg";
import cinema2Alt2 from "../assets/cinema2-2.jpg";
import movie1 from "../assets/movie1.jpg";
import movie2 from "../assets/movie2.webp";
import movie3 from "../assets/movie3.webp";
import movie4 from "../assets/movie4.webp";
import movie5 from "../assets/movie5.webp";
import movie6 from "../assets/movie6.webp";
import movie7 from "../assets/movie7.webp";
import movie8 from "../assets/movie8.webp";
import movie9child from "../assets/movie9child.webp";
import movie10child from "../assets/movie10child.webp";
import movie11child from "../assets/movie11child.png";
import movie12 from "../assets/movie12.webp";
import Header from "../components/Header";
import { CinemaSeatIcon, CinemaScreenIcon } from "../assets/Icons";

const cinemaCards = [
  {
    id: "cinema-1",
    name: "Cinema Star",
    city: "Москва",
    description:
      "Флагманский кинотеатр в центре города с премиальными залами, Dolby Atmos и отдельной lounge-зоной.",
    advantages: ["IMAX и Dolby Atmos", "Реклайнер-кресла", "Фуд-корт и лаунж"],
    images: [cinema1Main, cinema1Alt1, cinema1Alt2],
  },
  {
    id: "cinema-2",
    name: "Nova Cinema",
    city: "Санкт-Петербург",
    description:
      "Современный киноцентр у набережной: просторные залы, удобная парковка и семейные форматы показов.",
    advantages: [
      "Детские утренние сеансы",
      "Бесплатная парковка",
      "VIP-зал с сервисом",
    ],
    images: [cinema2Main, cinema2Alt1, cinema2Alt2],
  },
];

const scheduleMovies = [
  {
    id: "movie-1",
    title: "Аватар: Пламя и пепел",
    genre: "Фантастика, Приключения",
    duration: "3ч 20м",
    rating: "12+",
    poster: movie1,
    screenings: [
      {
        dayOffset: 0,
        time: "16:40",
        price: 600,
        format: "2D",
        hall: "Зал 4",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 0,
        time: "19:30",
        price: 800,
        format: "IMAX",
        hall: "Зал 1",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 1,
        time: "18:20",
        price: 650,
        format: "2D",
        hall: "Зал 2",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 2,
        time: "21:10",
        price: 700,
        format: "Dolby",
        hall: "Зал 3",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "23:30",
        price: 760,
        format: "2D",
        hall: "VIP",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-2",
    title: "Грозовой перевал",
    genre: "Мелодрама, Драма",
    duration: "2ч 30м",
    rating: "16+",
    poster: movie2,
    screenings: [
      {
        dayOffset: 0,
        time: "14:10",
        price: 500,
        format: "2D",
        hall: "Зал 5",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 1,
        time: "17:50",
        price: 650,
        format: "2D",
        hall: "Зал 2",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 2,
        time: "11:40",
        price: 520,
        format: "2D",
        hall: "Зал 2",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "20:40",
        price: 700,
        format: "2D",
        hall: "Зал 1",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-3",
    title: "На помощь!",
    genre: "Триллер",
    duration: "2ч 10м",
    rating: "18+",
    poster: movie3,
    screenings: [
      {
        dayOffset: 0,
        time: "13:20",
        price: 580,
        format: "2D",
        hall: "Зал 3",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 1,
        time: "18:40",
        price: 700,
        format: "Dolby",
        hall: "Зал 4",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 2,
        time: "22:10",
        price: 760,
        format: "2D",
        hall: "Зал 6",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "23:50",
        price: 820,
        format: "2D",
        hall: "VIP",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-4",
    title: "Казнить нельзя помиловать",
    genre: "Триллер, Боевик, Детектив, Криминал, Фантастика, Драма",
    duration: "1ч 55м",
    rating: "16+",
    poster: movie4,
    screenings: [
      {
        dayOffset: 0,
        time: "22:20",
        price: 750,
        format: "2D",
        hall: "Зал 6",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 1,
        time: "20:00",
        price: 700,
        format: "Dolby",
        hall: "Зал 2",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 2,
        time: "23:10",
        price: 800,
        format: "2D",
        hall: "VIP",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "16:10",
        price: 640,
        format: "2D",
        hall: "Зал 3",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-5",
    title: "Горничная",
    genre: "Триллер",
    duration: "2ч 25м",
    rating: "16+",
    poster: movie5,
    screenings: [
      {
        dayOffset: 0,
        time: "12:00",
        price: 540,
        format: "2D",
        hall: "Зал 2",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 1,
        time: "16:30",
        price: 630,
        format: "2D",
        hall: "Зал 5",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 2,
        time: "20:20",
        price: 710,
        format: "2D",
        hall: "Зал 4",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 3,
        time: "22:40",
        price: 790,
        format: "Dolby",
        hall: "VIP",
        cinema: "Cinema Star",
      },
    ],
  },
  {
    id: "movie-6",
    title: "Свист",
    genre: "Хоррор",
    duration: "1ч 50м",
    rating: "18+",
    poster: movie6,
    screenings: [
      {
        dayOffset: 0,
        time: "15:10",
        price: 610,
        format: "2D",
        hall: "Зал 1",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 1,
        time: "21:20",
        price: 760,
        format: "2D",
        hall: "Зал 3",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 2,
        time: "23:15",
        price: 830,
        format: "Dolby",
        hall: "Зал 2",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "10:40",
        price: 470,
        format: "2D",
        hall: "Зал 5",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-7",
    title: "Опасный дуэт",
    genre: "Комедия, Боевик",
    duration: "2ч 15м",
    rating: "16+",
    poster: movie7,
    screenings: [
      {
        dayOffset: 0,
        time: "11:15",
        price: 500,
        format: "2D",
        hall: "Зал 2",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 1,
        time: "14:50",
        price: 620,
        format: "2D",
        hall: "Зал 1",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 2,
        time: "19:40",
        price: 730,
        format: "Dolby",
        hall: "Зал 4",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "21:55",
        price: 780,
        format: "2D",
        hall: "Зал 6",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-8",
    title: "Возвращение в Сайлент Хилл",
    genre: "Хоррор",
    duration: "2ч",
    rating: "16+",
    poster: movie8,
    screenings: [
      {
        dayOffset: 0,
        time: "18:00",
        price: 650,
        format: "2D",
        hall: "Зал 3",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 1,
        time: "12:30",
        price: 560,
        format: "2D",
        hall: "Зал 3",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 2,
        time: "21:30",
        price: 780,
        format: "2D",
        hall: "Зал 1",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "23:40",
        price: 720,
        format: "2D",
        hall: "Зал 4",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-9",
    title: "Зверополис 2",
    genre: "Комедия, Боевик, Мультфильм, Приключения, Семейный",
    duration: "2ч",
    rating: "6+",
    poster: movie9child,
    screenings: [
      {
        dayOffset: 0,
        time: "10:20",
        price: 450,
        format: "2D",
        hall: "Зал 5",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 1,
        time: "13:10",
        price: 520,
        format: "2D",
        hall: "Зал 2",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 2,
        time: "16:00",
        price: 590,
        format: "2D",
        hall: "Зал 1",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 3,
        time: "18:30",
        price: 640,
        format: "2D",
        hall: "Зал 3",
        cinema: "Cinema Star",
      },
    ],
  },
  {
    id: "movie-10",
    title: "Губка Боб: В поисках квадратных штанов",
    genre: "Комедия, Мультфильм, Приключения, Семейный, Фэнтези",
    duration: "1ч 45м",
    rating: "6+",
    poster: movie10child,
    screenings: [
      {
        dayOffset: 0,
        time: "09:40",
        price: 430,
        format: "2D",
        hall: "Зал 1",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 1,
        time: "12:20",
        price: 500,
        format: "2D",
        hall: "Зал 5",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 2,
        time: "15:10",
        price: 570,
        format: "2D",
        hall: "Зал 3",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 3,
        time: "17:20",
        price: 620,
        format: "2D",
        hall: "Зал 2",
        cinema: "Nova Cinema",
      },
    ],
  },
  {
    id: "movie-11",
    title: "Шрек",
    genre: "Комедия, Мультфильм, Приключения, Семейный",
    duration: "2ч 5м",
    rating: "6+",
    poster: movie11child,
    screenings: [
      {
        dayOffset: 0,
        time: "11:00",
        price: 480,
        format: "2D",
        hall: "Зал 2",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 1,
        time: "14:30",
        price: 560,
        format: "2D",
        hall: "Зал 4",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 2,
        time: "17:40",
        price: 620,
        format: "2D",
        hall: "Зал 5",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 3,
        time: "20:10",
        price: 680,
        format: "2D",
        hall: "Зал 1",
        cinema: "Cinema Star",
      },
    ],
  },
  {
    id: "movie-12",
    title: "Заклятие: Обряд реинкарнации",
    genre: "Хоррор",
    duration: "1ч 45м",
    rating: "18+",
    poster: movie12,
    screenings: [
      {
        dayOffset: 0,
        time: "23:20",
        price: 820,
        format: "Dolby",
        hall: "VIP",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 1,
        time: "19:10",
        price: 680,
        format: "2D",
        hall: "Зал 1",
        cinema: "Cinema Star",
      },
      {
        dayOffset: 2,
        time: "17:00",
        price: 590,
        format: "2D",
        hall: "Зал 5",
        cinema: "Nova Cinema",
      },
      {
        dayOffset: 3,
        time: "22:00",
        price: 760,
        format: "2D",
        hall: "Зал 2",
        cinema: "Cinema Star",
      },
    ],
  },
];

const rows = 4;
const cols = 10;

const seatsData = Array.from({ length: rows }, (_, r) =>
  Array.from({ length: cols }, (_, c) => ({
    id: `${r + 1}-${c + 1}`,
    row: r + 1,
    seat: c + 1,
  })),
);

function getBaseDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function getDateByOffset(offset) {
  const date = getBaseDate();
  date.setDate(date.getDate() + offset);
  return date;
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function formatTabTitle(date, offset) {
  if (offset === 0) return "Сегодня";
  if (offset === 1) return "Завтра";

  const weekday = new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(
    date,
  );
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

function formatDateLabel(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function getHour(time) {
  return Number(time.split(":")[0]);
}

export default function MainPage() {
  const [activeSlides, setActiveSlides] = useState({
    "cinema-1": 0,
    "cinema-2": 0,
  });

  const dayTabs = useMemo(() => {
    return Array.from({ length: 4 }, (_, offset) => {
      const date = getDateByOffset(offset);
      return {
        key: toDateKey(date),
        title: formatTabTitle(date, offset),
        label: formatDateLabel(date),
      };
    });
  }, []);

  const initialDate = dayTabs[0]?.key ?? toDateKey(getBaseDate());

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [cinemaFilter, setCinemaFilter] = useState("all");
  const [selectedSession, setSelectedSession] = useState(null);

  const allCinemas = useMemo(() => {
    const unique = new Set(
      scheduleMovies.flatMap((movie) =>
        movie.screenings.map((session) => session.cinema),
      ),
    );
    return Array.from(unique);
  }, []);

  const shiftSlide = (cinemaId, direction, imagesLength) => {
    setActiveSlides((prev) => {
      const current = prev[cinemaId] ?? 0;
      const next = (current + direction + imagesLength) % imagesLength;
      return { ...prev, [cinemaId]: next };
    });
  };

  const filteredSchedule = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return scheduleMovies
      .map((movie) => {
        const screenings = movie.screenings.filter((session) => {
          const sessionDate = toDateKey(getDateByOffset(session.dayOffset));
          if (sessionDate !== selectedDate) return false;

          if (cinemaFilter !== "all" && session.cinema !== cinemaFilter)
            return false;

          if (priceFilter === "under600" && session.price >= 600) return false;
          if (
            priceFilter === "600to750" &&
            (session.price < 600 || session.price > 750)
          )
            return false;
          if (priceFilter === "over750" && session.price <= 750) return false;

          const hour = getHour(session.time);
          if (timeFilter === "morning" && hour >= 12) return false;
          if (timeFilter === "day" && (hour < 12 || hour >= 18)) return false;
          if (timeFilter === "evening" && (hour < 18 || hour >= 23))
            return false;
          if (timeFilter === "night" && hour < 23) return false;

          return true;
        });

        return { ...movie, screenings };
      })
      .filter((movie) => {
        if (movie.screenings.length === 0) return false;
        if (!query) return true;

        const byTitle = movie.title.toLowerCase().includes(query);
        const byGenre = movie.genre.toLowerCase().includes(query);
        const byCinema = movie.screenings.some((session) =>
          session.cinema.toLowerCase().includes(query),
        );

        return byTitle || byGenre || byCinema;
      });
  }, [cinemaFilter, priceFilter, searchQuery, selectedDate, timeFilter]);

  const selectCinemaFilter = (cinemaName) => {
    setCinemaFilter(cinemaName);
    const scheduleSection = document.getElementById("schedule-section");
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Наши кинотеатры
        </h1>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {cinemaCards.map((cinema) => {
            const currentSlide = activeSlides[cinema.id] ?? 0;

            return (
              <article
                key={cinema.id}
                className="glass-card overflow-hidden rounded-3xl p-4 sm:p-5"
              >
                <div className="grid gap-5 md:grid-cols-[44%_56%] md:items-stretch">
                  <div className="relative min-h-64 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={cinema.images[currentSlide]}
                      alt={`${cinema.name} ${currentSlide + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-8">
                      <button
                        type="button"
                        onClick={() =>
                          shiftSlide(cinema.id, -1, cinema.images.length)
                        }
                        className="rounded-lg border border-white/20 bg-black/40 p-1.5 text-white/85 transition hover:border-cyan-300/50 hover:text-cyan-100"
                        aria-label="Предыдущее фото"
                      >
                        <ChevronLeftIcon className="size-4" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {cinema.images.map((_, dotIndex) => (
                          <span
                            key={dotIndex}
                            className={`h-1.5 rounded-full transition-all ${
                              dotIndex === currentSlide
                                ? "w-5 bg-cyan-200"
                                : "w-1.5 bg-white/55"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          shiftSlide(cinema.id, 1, cinema.images.length)
                        }
                        className="rounded-lg border border-white/20 bg-black/40 p-1.5 text-white/85 transition hover:border-cyan-300/50 hover:text-cyan-100"
                        aria-label="Следующее фото"
                      >
                        <ChevronRightIcon className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold text-white/95">
                          {cinema.name}
                        </h2>
                        <span className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-200">
                          {cinema.city}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-white/70">
                        {cinema.description}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2 pr-3">
                      {cinema.advantages.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/85"
                        >
                          <MapPinIcon className="size-4 shrink-0 text-cyan-200" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => selectCinemaFilter(cinema.name)}
                      className="mt-5 mr-3 inline-flex max-w-full self-start whitespace-normal rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-left text-sm font-semibold leading-snug text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
                    >
                      Добавить в фильтр расписания
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section id="schedule-section" className="mt-14 scroll-mt-28">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Расписание сеансов
          </h2>

          <div className="glass-card mt-6 rounded-3xl p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {dayTabs.map((day) => (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => setSelectedDate(day.key)}
                  className={`rounded-xl border px-4 py-2 text-left transition ${
                    selectedDate === day.key
                      ? "border-cyan-300/55 bg-cyan-300/12 text-cyan-100"
                      : "border-white/12 bg-white/[0.03] text-white/75 hover:border-cyan-300/35"
                  }`}
                >
                  <div className="text-sm font-semibold">{day.title}</div>
                  <div className="text-xs opacity-80">{day.label}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <label className="relative xl:col-span-2">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Поиск фильма, жанра или кинотеатра"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="relative">
                <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <select
                value={priceFilter}
                onChange={(event) => setPriceFilter(event.target.value)}
                className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-300/50"
              >
                <option value="all" className="bg-[#0b1020]">
                  Цена: любая
                </option>
                <option value="under600" className="bg-[#0b1020]">
                  До 600 ₽
                </option>
                <option value="600to750" className="bg-[#0b1020]">
                  600–750 ₽
                </option>
                <option value="over750" className="bg-[#0b1020]">
                  Свыше 750 ₽
                </option>
              </select>

              <select
                value={timeFilter}
                onChange={(event) => setTimeFilter(event.target.value)}
                className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-300/50"
              >
                <option value="all" className="bg-[#0b1020]">
                  Время: любое
                </option>
                <option value="morning" className="bg-[#0b1020]">
                  Утро (до 12:00)
                </option>
                <option value="day" className="bg-[#0b1020]">
                  День (12:00–18:00)
                </option>
                <option value="evening" className="bg-[#0b1020]">
                  Вечер (18:00–23:00)
                </option>
                <option value="night" className="bg-[#0b1020]">
                  Ночь (после 23:00)
                </option>
              </select>

              <select
                value={cinemaFilter}
                onChange={(event) => setCinemaFilter(event.target.value)}
                className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-300/50"
              >
                <option value="all" className="bg-[#0b1020]">
                  Кинотеатр: все
                </option>
                {allCinemas.map((cinemaName) => (
                  <option
                    key={cinemaName}
                    value={cinemaName}
                    className="bg-[#0b1020]"
                  >
                    {cinemaName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {filteredSchedule.map((movie) => (
              <article
                key={movie.id}
                className="glass-card rounded-3xl p-4 sm:p-5"
              >
                <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-56 w-full rounded-2xl object-cover"
                  />

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-300">
                      {movie.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/75">
                      {movie.rating} · {movie.genre} · {movie.duration}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {movie.screenings.map((session, index) => (
                        <button
                          key={`${movie.id}-${session.time}-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedSession({
                              movieTitle: movie.title,
                              moviePoster: movie.poster,
                              movieRating: movie.rating,
                              movieDuration: movie.duration,
                              session,
                            })
                          }
                          className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/[0.08]"
                        >
                          <div className="text-xs text-white/60">
                            {session.format} · {session.hall}
                          </div>
                          <div className="text-xs text-cyan-200">
                            {session.cinema}
                          </div>
                          <div className="mt-1 text-3xl font-semibold text-yellow-300">
                            {session.time}
                          </div>
                          <div className="text-base font-medium text-white">
                            {session.price} ₽
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filteredSchedule.length === 0 && (
              <div className="glass-card rounded-2xl p-8 text-center text-white/70">
                По выбранным фильтрам сеансов не найдено.
              </div>
            )}
          </div>
        </section>
      </main>

      <Dialog
        open={Boolean(selectedSession)}
        onClose={() => setSelectedSession(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-xl rounded-3xl p-5 sm:p-6">
            <div className="flex flex-col items-center gap-8 p-10 bg-slate-900 rounded-xl">
              <div className="w-full h-2 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] rounded-full mb-10"></div>
              <div className="grid grid-cols-10 gap-3">
                {seatsData.flat().map((seat) => (
                  <button
                    key={seat.id}
                    className="w-8 h-8 md:w-10 md:h-10 bg-slate-700 hover:bg-blue-500 rounded-t-lg transition-colors flex items-center justify-center text-[10px] text-slate-400 hover:text-white"
                    onClick={() =>
                      console.log(
                        `Выбрано место: ряд ${seat.row}, место ${seat.seat}`,
                      )
                    }
                  >
                    {seat.seat}
                  </button>
                ))}
              </div>

              <p className="text-slate-400 text-sm">Выберите место в зале</p>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
