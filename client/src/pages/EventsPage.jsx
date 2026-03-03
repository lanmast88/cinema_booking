import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

const events = [
  {
    id: "event-1",
    title: "Открыли два новых зала с Dolby Atmos",
    subtitle: "Обновление кинотеатра · 3 марта",
    description:
      "Теперь у нас больше сеансов в прайм-тайм и заметно лучше звук для премьер.",
    details:
      "Новые залы уже доступны для бронирования. В расписании отмечены специальным тегом Atmos Experience.",
    badge: "NEWS",
    badgeClassName:
      "border-cyan-300/40 bg-cyan-300/12 text-cyan-100 shadow-[0_8px_18px_rgba(34,211,238,0.25)]",
  },
  {
    id: "event-2",
    title: "Тематическая вечеринка к громкой премьере",
    subtitle: "Событие недели · 7 марта",
    description:
      "Перед вечерним сеансом: фотозона, костюмы, конкурс на лучший образ.",
    details:
      "Старт программы за 40 минут до показа. Победители получают сертификаты на билеты и фирменный мерч.",
    badge: "LIVE",
    badgeClassName:
      "border-fuchsia-300/45 bg-fuchsia-300/12 text-fuchsia-100 shadow-[0_8px_18px_rgba(217,70,239,0.25)]",
  },
  {
    id: "event-3",
    title: "Детская анимация по выходным",
    subtitle: "Для семейных сеансов",
    description:
      "Перед мультфильмами работают аниматоры, игры и мини-квесты в фойе.",
    details:
      "Программа начинается за 30 минут до показа. Вход по билету на детский сеанс.",
    badge: "KIDS",
    badgeClassName:
      "border-emerald-300/45 bg-emerald-300/12 text-emerald-100 shadow-[0_8px_18px_rgba(16,185,129,0.25)]",
  },
  {
    id: "event-4",
    title: "Лимитированное меню в баре",
    subtitle: "Новый сезон",
    description:
      "Добавили тематические комбо и напитки под текущие премьеры.",
    details:
      "Лимитированные позиции доступны только в период проката выбранных фильмов.",
    badge: "BAR",
    badgeClassName:
      "border-amber-300/45 bg-amber-300/12 text-amber-100 shadow-[0_8px_18px_rgba(251,191,36,0.25)]",
  },
];

export default function EventsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <section className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10 p-6 sm:p-8">
          <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100">
            EVENTS
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            События кинотеатра
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">
            Новости площадки, тематические активности и специальные программы для
            гостей.
          </p>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {events.map((event) => (
            <InfoCard
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              description={event.description}
              badge={event.badge}
              badgeClassName={event.badgeClassName}
            >
              <p className="mt-3 text-sm leading-relaxed text-white/70">{event.details}</p>
            </InfoCard>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
