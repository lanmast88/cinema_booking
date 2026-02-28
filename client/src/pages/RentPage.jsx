import { useState } from "react";
import {
  BriefcaseIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  HeartIcon,
  PlayIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import Footer from "../components/Footer";
import rent1 from "../assets/rent1-1.jpg";
import rent2 from "../assets/rent1-2.jpg";
import rent3 from "../assets/rent1-3.jpg";

const packages = [
  {
    id: "date",
    title: "Романтическое свидание",
    icon: HeartIcon,
    description:
      "Аренда малого зала, ваш фильм на флешке, игристое и фруктовая тарелка.",
    details: ["До 12 гостей", "2.5 часа", "Декор по запросу"],
  },
  {
    id: "birthday",
    title: "Детский день рождения",
    icon: CakeIcon,
    description:
      "Мультфильм на выбор, поздравление на экране и зона для торта в фойе.",
    details: ["До 25 гостей", "3 часа", "Аниматор по запросу"],
  },
  {
    id: "gaming",
    title: "Гейм-батл",
    icon: PlayIcon,
    description:
      "Подключение PS5/Xbox к большому экрану и турнирная сетка для команды.",
    details: ["До 20 гостей", "2 часа", "2 микрофона"],
  },
  {
    id: "business",
    title: "Бизнес-презентация",
    icon: BriefcaseIcon,
    description:
      "Утренний или дневной слот, микрофоны, кликер и кофе-брейк для команды.",
    details: ["До 80 гостей", "По таймингу", "HDMI + презентации"],
  },
];

const specs = [
  { label: "Вместимость", value: "Малый зал: до 25, большой: до 120 гостей" },
  {
    label: "Подключение",
    value: "HDMI, вывод с ноутбука, беспроводной кликер",
  },
  {
    label: "Звук и свет",
    value: "Регулировка яркости и громкости под сценарий",
  },
  {
    label: "Дополнительно",
    value: "Микрофоны, фон. музыка, бренд-слайды на экране",
  },
];

const photos = [
  {
    id: "photo-1",
    title: "Корпоратив с логотипом на экране",
    image: rent1,
    facts: [
      "Логотип компании выводится на экран перед началом выступления.",
      "Комфортная рассадка до 80 гостей в театральной схеме.",
      "Выделяется зона для спикеров и теста оборудования.",
    ],
    layout:
      "Экран спереди, центральный проход, 2 первых ряда можно отдать под спикеров и команду организаторов.",
  },
  {
    id: "photo-2",
    title: "Детский праздник с зоной торта",
    image: rent2,
    facts: [
      "Поздравление именинника показывается на экране перед мультфильмом.",
      "Отдельная зона для торта и фото в фойе рядом с залом.",
      "Оптимальная рассадка по семьям, чтобы родители были рядом с детьми.",
    ],
    layout:
      "Экран спереди, по центру проход к выходу, боковые ряды удобно выделить для родителей с малышами.",
  },
  {
    id: "photo-3",
    title: "Приватный кинопросмотр для пары",
    image: rent3,
    facts: [
      "Уютный малый зал с камерной атмосферой и приглушённым светом.",
      "Можно запустить ваш фильм с флешки или выбрать из каталога.",
      "Персональная подача напитков и закусок перед сеансом.",
    ],
    layout:
      "Экран спереди, комфортная дистанция между рядами, можно забронировать только центральный блок мест.",
  },
];

const reviews = [
  {
    id: "review-1",
    text: "Проводили презентацию продукта. Всё подключили за 10 минут, звук отличный.",
    author: "Мария, Event-менеджер",
  },
  {
    id: "review-2",
    text: "Отмечали день рождения сына, поздравление на экране - восторг у детей.",
    author: "Олег, клиент",
  },
];

const faqItems = [
  {
    id: "faq-1",
    q: "Можно ли со своей едой?",
    a: "Да, по согласованию с менеджером. Также можем организовать фуршет от бара.",
  },
  {
    id: "faq-2",
    q: "Какой фильм можно посмотреть?",
    a: "Из текущего проката или ваш архивный файл при соблюдении техтребований.",
  },
  {
    id: "faq-3",
    q: "За сколько нужно бронировать?",
    a: "Рекомендуем за 5-7 дней. Перенос/отмена - по правилам брони.",
  },
];

export default function RentPage() {
  const [openedFaq, setOpenedFaq] = useState(null);
  const [activePhotoId, setActivePhotoId] = useState(photos[0].id);
  const activePhoto =
    photos.find((photo) => photo.id === activePhotoId) ?? photos[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <section className="glass-card rounded-3xl border border-white/12 p-6 sm:p-8">
          <div className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
            Аренда зала
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Приватные ивенты в кинотеатре
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            Организуем событие под ключ: от свиданий и дней рождения до
            бизнес-презентаций и игровых турниров на большом экране.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Готовые сценарии</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {packages.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="relative glass-card rounded-2xl border border-white/12 p-5 transition hover:border-fuchsia-300/45"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white/95">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/72">
                        {item.description}
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-200/45 bg-gradient-to-br from-pink-400/85 to-fuchsia-500/85 shadow-[0_8px_18px_rgba(236,72,153,0.35)]">
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.details.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 rounded-xl border border-cyan-300/45 bg-gradient-to-r from-cyan-500/85 to-blue-500/85 text-white shadow-[0_8px_18px_rgba(56,189,248,0.32)] hover:from-cyan-400/90 hover:to-blue-400/90 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)] transition "
                  >
                    Забронировать
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">
              Технические характеристики
            </h2>
            <div className="mt-4 space-y-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-white/12 bg-white/[0.03] p-3"
                >
                  <div className="text-sm font-semibold text-cyan-100">
                    {spec.label}
                  </div>
                  <div className="mt-1 text-sm text-white/75">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-2">
              {faqItems.map((item) => {
                const opened = openedFaq === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/12 bg-white/[0.03]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenedFaq((prev) =>
                          prev === item.id ? null : item.id,
                        )
                      }
                      className="flex w-full items-center justify-between px-3 py-3 text-left"
                    >
                      <span className="text-sm font-medium text-white/90">
                        {item.q}
                      </span>
                      <QuestionMarkCircleIcon className="h-4 w-4 text-cyan-200" />
                    </button>
                    {opened && (
                      <p className="px-3 pb-3 text-sm text-white/70">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Фото и схема зала</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {photos.map((photo) => (
                <button
                  type="button"
                  key={photo.id}
                  onClick={() => setActivePhotoId(photo.id)}
                  className={`group overflow-hidden rounded-2xl border bg-white/[0.03] text-left transition-all duration-300 ${
                    activePhotoId === photo.id
                      ? "border-fuchsia-300/60 shadow-[0_10px_24px_rgba(236,72,153,0.28)]"
                      : "border-white/12 hover:border-cyan-300/45"
                  }`}
                >
                  <div className="relative h-32">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className={`h-full w-full object-cover transition-transform duration-300 ${
                        activePhotoId === photo.id
                          ? "scale-[1.03]"
                          : "group-hover:scale-[1.02]"
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2">
                      <p className="text-xs font-medium text-white/90">
                        {photo.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div
              key={activePhoto.id}
              className="mt-10 rounded-2xl border border-white/12 bg-white/[0.03] p-4 transition-all duration-300"
            >
              <div className="text-sm font-semibold text-cyan-100 mt-2">
                Факты о мероприятии
              </div>
              <p className="mt-1 text-sm text-white/80">{activePhoto.title}</p>
              <div className="mt-3 space-y-2">
                {activePhoto.facts.map((fact) => (
                  <p
                    key={fact}
                    className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/72"
                  >
                    {fact}
                  </p>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-fuchsia-200">
                Схема посадки
              </div>
              <p className="mt-1 text-sm text-white/70">{activePhoto.layout}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-5 sm:p-6">
              <h2 className="text-2xl font-semibold">Отзывы</h2>
              <div className="mt-4 space-y-3">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-xl border border-white/12 bg-white/[0.03] p-3"
                  >
                    <p className="text-sm text-white/80">“{review.text}”</p>
                    <p className="mt-2 text-xs text-cyan-100/90">
                      {review.author}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-3xl border border-pink-300/25 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold">Рассчитать стоимость</h2>
              <p className="mt-2 text-sm text-white/70">
                Оставьте базовые параметры, и менеджер свяжется с вами.
              </p>
              <div className="mt-4 grid gap-2">
                <input
                  placeholder="Дата мероприятия"
                  className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/50"
                />
                <input
                  placeholder="Количество гостей"
                  className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/50"
                />
                <input
                  placeholder="Тип события"
                  className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/50"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-pink-300/50 bg-gradient-to-r from-pink-500/85 to-fuchsia-500/85 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(236,72,153,0.35)] transition hover:from-pink-400 hover:to-fuchsia-400"
                >
                  <CheckBadgeIcon className="h-4 w-4" />
                  Рассчитать стоимость
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/45 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)] transition hover:from-emerald-400 hover:to-teal-400"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  WhatsApp менеджера
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
