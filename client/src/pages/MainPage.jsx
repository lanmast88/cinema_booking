import { useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MapPinIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

const roles = [
  { value: "guest", label: "Гость" },
  { value: "user", label: "Пользователь" },
  { value: "admin", label: "Админ" },
];

const cinemas = [
  {
    name: "Neon Cinema Downtown",
    city: "Москва",
    address: "ул. Тверская, 12",
    halls: 8,
    seats: 1240,
  },
  {
    name: "Blue Hall Arena",
    city: "Санкт-Петербург",
    address: "Невский пр., 43",
    halls: 6,
    seats: 910,
  },
  {
    name: "Lumen Park",
    city: "Казань",
    address: "пр. Победы, 91",
    halls: 5,
    seats: 760,
  },
  {
    name: "Neon Cinema Downtown",
    city: "Москва",
    address: "ул. Тверская, 12",
    halls: 8,
    seats: 1240,
  },
  {
    name: "Blue Hall Arena",
    city: "Санкт-Петербург",
    address: "Невский пр., 43",
    halls: 6,
    seats: 910,
  },
  {
    name: "Lumen Park",
    city: "Казань",
    address: "пр. Победы, 91",
    halls: 5,
    seats: 760,
  },
  {
    name: "Neon Cinema Downtown",
    city: "Москва",
    address: "ул. Тверская, 12",
    halls: 8,
    seats: 1240,
  },
  {
    name: "Blue Hall Arena",
    city: "Санкт-Петербург",
    address: "Невский пр., 43",
    halls: 6,
    seats: 910,
  },
  {
    name: "Lumen Park",
    city: "Казань",
    address: "пр. Победы, 91",
    halls: 5,
    seats: 760,
  },

  {
    name: "Aurora Screen",
    city: "Новосибирск",
    address: "ул. Ленина, 3",
    halls: 7,
    seats: 1030,
  },
  {
    name: "Pixel Movie Point",
    city: "Екатеринбург",
    address: "ул. Малышева, 26",
    halls: 4,
    seats: 640,
  },
  {
    name: "Lumen Park",
    city: "Казань",
    address: "пр. Победы, 91",
    halls: 5,
    seats: 760,
  },
  {
    name: "Aurora Screen",
    city: "Новосибирск",
    address: "ул. Ленина, 3",
    halls: 7,
    seats: 1030,
  },
  {
    name: "Pixel Movie Point",
    city: "Екатеринбург",
    address: "ул. Малышева, 26",
    halls: 4,
    seats: 640,
  },
  {
    name: "Lumen Park",
    city: "Казань",
    address: "пр. Победы, 91",
    halls: 5,
    seats: 760,
  },
  {
    name: "Aurora Screen",
    city: "Новосибирск",
    address: "ул. Ленина, 3",
    halls: 7,
    seats: 1030,
  },
  {
    name: "Pixel Movie Point",
    city: "Екатеринбург",
    address: "ул. Малышева, 26",
    halls: 4,
    seats: 640,
  },
];

function AuthAction({ role }) {
  if (role === "guest") {
    return (
      <button className="btn-glossy rounded-xl px-4 py-2 text-sm font-semibold">
        Вход / Регистрация
      </button>
    );
  }

  if (role === "admin") {
    return (
      <button className="rounded-xl border border-fuchsia-300/40 bg-fuchsia-300/10 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:border-fuchsia-200/60 hover:bg-fuchsia-300/20">
        Админ-панель
      </button>
    );
  }

  return (
    <button className="rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20">
      Личный кабинет
    </button>
  );
}

export default function MainPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState("guest");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredCinemas = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cinemas;

    return cinemas.filter(
      (cinema) =>
        cinema.name.toLowerCase().includes(query) ||
        cinema.city.toLowerCase().includes(query) ||
        cinema.address.toLowerCase().includes(query),
    );
  }, [search]);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredCinemas.length / ITEMS_PER_PAGE);
  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredCinemas.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <header className="relative z-30 mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <nav className="glass-card flex items-center gap-4 rounded-2xl px-4 py-3 lg:px-5">
          <a href="#" className="flex shrink-0 items-center gap-3">
            <img
              alt="Cinema Booking"
              src={logo}
              className="h-20 w-9 rounded-lg object-cover pt-2"
            />
            <span className="hidden text-sm font-semibold tracking-wide text-white/90 sm:block">
              CINEMA BOOKING
            </span>
          </a>

          <label className="relative hidden min-w-0 flex-1 items-center lg:flex">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 size-5 text-white/45" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск кинотеатра или города"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-cyan-300/50 focus:shadow-[0_0_24px_rgba(0,183,255,0.24)]"
            />
          </label>

          <div className="hidden items-center gap-3 lg:flex">
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition hover:border-white/30 focus:border-cyan-300/50"
            >
              {roles.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="bg-[#0b1020]"
                >
                  {item.label}
                </option>
              ))}
            </select>
            <AuthAction role={role} />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="ml-auto inline-flex items-center rounded-xl border border-white/15 p-2 text-white/80 lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#090d1a]/95 p-6 ring-1 ring-white/10">
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-white/20 p-2 text-white/70"
              >
                <XMarkIcon className="size-5" aria-hidden="true" />
              </button>
            </div>

            <label className="relative block">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white/45" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Поиск кинотеатра"
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none"
              />
            </label>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/60">
                  Тестовая роль
                </label>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none"
                >
                  {roles.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      className="bg-[#0b1020]"
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <AuthAction role={role} />
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-36 pt-12 lg:px-10">
        <div className="animate-slide-up">
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Список кинотеатров
          </h1>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {currentItems.map((cinema, index) => (
            <article
              key={`${cinema.name}-${startIndex + index}`}
              className="glass-card hover-lift rounded-2xl p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white/95">
                  {cinema.name}
                </h2>
                <span className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-200">
                  {cinema.city}
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-white/65">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-white/50" />
                <span>{cinema.address}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/80">
                  Залов:{" "}
                  <span className="font-semibold text-white">
                    {cinema.halls}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/80">
                  Мест:{" "}
                  <span className="font-semibold text-white">
                    {cinema.seats}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filteredCinemas.length === 0 && (
          <div className="glass-card mt-8 rounded-2xl p-8 text-center text-white/70">
            По запросу{" "}
            <span className="font-semibold text-cyan-200">{search}</span> ничего
            не найдено.
          </div>
        )}

        {totalPages > 0 && (
          <nav
            aria-label="Pagination"
            className="pagination-shell fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 items-center justify-between gap-2 rounded-2xl px-3 py-3 sm:gap-3 sm:px-4"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="pagination-arrow"
            >
              Назад
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`pagination-page ${safeCurrentPage === i + 1 ? "is-active" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="pagination-arrow"
            >
              Вперед
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}
