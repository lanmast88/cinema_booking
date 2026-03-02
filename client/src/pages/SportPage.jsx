import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuChipIcon,
  EnvelopeIcon,
  EyeIcon,
  FireIcon,
  MegaphoneIcon,
  QrCodeIcon,
  SpeakerWaveIcon,
  TicketIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";
import community1 from "../assets/community1.jpg";
import community2 from "../assets/community2.jpg";
import community3 from "../assets/community3.jpg";
import menu1 from "../assets/menu1.jpg";
import menu2 from "../assets/menu2.jpg";
import menu3 from "../assets/menu3.jpg";
import techfeature1 from "../assets/techfeature1.jpg";
import techfeature2 from "../assets/techfeature2.jpg";
import techfeature3 from "../assets/techfeature3.jpg";

const broadcasts = [
  {
    sport: "Футбол",
    accent: "from-red-500/25 to-rose-500/10 border-red-300/30",
    sticker: "Топ-матч",
    stickerTone:
      "from-red-500/90 via-rose-500/90 to-orange-500/90 border-red-200/50 shadow-[0_10px_22px_rgba(239,68,68,0.35)]",
    matches: [
      "Лига Чемпионов: Реал Мадрид - Манчестер Сити · 22:45",
      "РПЛ: Спартак - Зенит · 20:00",
      "АПЛ: Арсенал - Ливерпуль · 19:30",
    ],
  },
  {
    sport: "Единоборства",
    accent: "from-orange-500/25 to-amber-500/10 border-orange-300/30",
    sticker: "Ночной эфир",
    stickerTone:
      "from-orange-500/90 via-amber-500/90 to-red-500/90 border-amber-200/50 shadow-[0_10px_22px_rgba(249,115,22,0.35)]",
    matches: [
      "UFC Fight Night · 01:00",
      "Титульный бой UFC · 03:30",
      "Бар работает до окончания трансляции",
    ],
  },
  {
    sport: "Хоккей",
    accent: "from-cyan-500/25 to-blue-500/10 border-cyan-300/30",
    sticker: "Плей-офф",
    stickerTone:
      "from-cyan-500/90 via-blue-500/90 to-indigo-500/90 border-cyan-200/50 shadow-[0_10px_22px_rgba(56,189,248,0.35)]",
    matches: [
      "КХЛ Плей-офф: Авангард - Ак Барс · 19:00",
      "НХЛ: Rangers - Bruins · 02:00",
    ],
  },
  {
    sport: "Киберспорт",
    accent: "from-fuchsia-500/25 to-purple-500/10 border-fuchsia-300/30",
    sticker: "Гранд-финал",
    stickerTone:
      "from-fuchsia-500/90 via-purple-500/90 to-indigo-500/90 border-fuchsia-200/50 shadow-[0_10px_22px_rgba(217,70,239,0.35)]",
    matches: [
      "The International: Гранд-финал · 18:00",
      "CS2 Major: Полуфиналы · 16:00",
    ],
  },
  {
    sport: "Баскетбол",
    accent: "from-orange-500/25 to-amber-500/10 border-orange-300/30",
    sticker: "Game Night",
    stickerTone:
      "from-orange-500/90 via-amber-500/90 to-red-500/90 border-amber-200/50 shadow-[0_10px_22px_rgba(249,115,22,0.35)]",

    matches: [
      "Евролига: ЦСКА — Реал Мадрид · 20:00",
      "Единая лига ВТБ: Зенит — УНИКС · 19:30",
      "NBA: Lakers — Celtics · 03:30",
    ],
  },
  {
    sport: "Другое",
    accent: "from-emerald-500/25 to-teal-500/10 border-emerald-300/30",
    sticker: "Выходные",
    stickerTone:
      "from-emerald-500/90 via-teal-500/90 to-cyan-500/90 border-emerald-200/50 shadow-[0_10px_22px_rgba(16,185,129,0.35)]",
    matches: [
      "Формула-1: Гран-при · 17:00",
      "Теннис: Финал Masters · 21:00",
      "Фигурное катание: Показательные · 15:00",
    ],
  },
];

const fanFeatures = [
  {
    title: "Профессиональный комментатор",
    text: "Громкие матчи комментирует приглашенный эксперт прямо в зале.",
    icon: MegaphoneIcon,
  },
  {
    title: "Атрибутика и фан-режим",
    text: "Приходите в шарфах и с флагами. Эмоции и поддержка приветствуются.",
    icon: FireIcon,
  },
  {
    title: "Звук на максимум",
    text: "Трибуны, удары и атмосфера стадиона в кинотеатральной акустике.",
    icon: SpeakerWaveIcon,
  },
];

const menuItems = [
  {
    text: "Комбо для компаний: XL попкорн + сет закусок + напитки",
    sticker: "Комбо",
    stickerTone:
      "from-orange-500/85 to-red-500/85 border-orange-200/50 shadow-[0_8px_18px_rgba(249,115,22,0.3)]",
  },
  {
    text: "Пивные наборы для фан-зон",
    sticker: "Топ",
    stickerTone:
      "from-amber-500/85 to-orange-500/85 border-amber-200/50 shadow-[0_8px_18px_rgba(245,158,11,0.3)]",
  },
  {
    text: "Предзаказ в зал через QR-код, чтобы не стоять в очереди",
    sticker: "QR Fast",
    stickerTone:
      "from-cyan-500/85 to-blue-500/85 border-cyan-200/50 shadow-[0_8px_18px_rgba(56,189,248,0.3)]",
  },
];

const socialProof = [
  {
    text: "Фотоотчеты с матчей: полные залы и реакция болельщиков",
    sticker: "Фото",
    stickerTone:
      "from-fuchsia-500/85 to-pink-500/85 border-fuchsia-200/50 shadow-[0_8px_18px_rgba(217,70,239,0.3)]",
  },
  {
    text: "Клубные карты для фанатов конкретных команд",
    sticker: "Club",
    stickerTone:
      "from-violet-500/85 to-indigo-500/85 border-violet-200/50 shadow-[0_8px_18px_rgba(139,92,246,0.3)]",
  },
  {
    text: "Розыгрыши в перерыве: угадай счет и получи сертификат",
    sticker: "Giveaway",
    stickerTone:
      "from-rose-500/85 to-orange-500/85 border-rose-200/50 shadow-[0_8px_18px_rgba(244,63,94,0.3)]",
  },
];

const techBenefits = [
  {
    title: "Экран 15 метров",
    text: "Размер изображения дает эффект присутствия на стадионе даже в дальних рядах.",
    photo: techfeature1,
    icon: EyeIcon,
    stickerTone:
      "from-cyan-500/90 to-blue-500/90 border-cyan-200/50 shadow-[0_10px_22px_rgba(56,189,248,0.32)]",
  },
  {
    title: "Звук 7.1",
    text: "Слышен каждый удар по мячу, реакция трибун и голос комментатора без провалов.",
    photo: techfeature2,
    icon: SpeakerWaveIcon,
    stickerTone:
      "from-violet-500/90 to-fuchsia-500/90 border-violet-200/50 shadow-[0_10px_22px_rgba(139,92,246,0.32)]",
  },
  {
    title: "Минимальная задержка",
    text: "Оптимизированный канал вещания для синхронного просмотра и live-реакций зала.",
    photo: techfeature3,
    icon: CpuChipIcon,
    stickerTone:
      "from-emerald-500/90 to-teal-500/90 border-emerald-200/50 shadow-[0_10px_22px_rgba(16,185,129,0.32)]",
  },
];

export default function SportPage() {
  const { user } = useAuth();
  const communityPhotos = [community1, community2, community3];
  const menuPhotos = [menu1, menu2, menu3];
  const [communityIndex, setCommunityIndex] = useState(0);
  const [menuIndex, setMenuIndex] = useState(0);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [isRentRequestModalOpen, setIsRentRequestModalOpen] = useState(false);
  const [rentRequestEmail, setRentRequestEmail] = useState("");
  const [rentRequestError, setRentRequestError] = useState("");
  const [rentRequestStatus, setRentRequestStatus] = useState("idle");
  const [isLoggedInRequestSuccess, setIsLoggedInRequestSuccess] =
    useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    guests: "",
    event: "",
  });
  const [bookingFormError, setBookingFormError] = useState("");

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleBookHall = () => {
    const isFormValid =
      bookingForm.date.trim() &&
      bookingForm.guests.toString().trim() &&
      bookingForm.event.trim();

    if (!isFormValid) {
      setBookingFormError("Заполните все поля формы.");
      setIsLoggedInRequestSuccess(false);
      return;
    }

    setBookingFormError("");

    if (user) {
      setIsLoggedInRequestSuccess(true);
      return;
    }
    setRentRequestError("");
    setRentRequestStatus("idle");
    setIsRentRequestModalOpen(true);
  };

  const handleGuestRentRequest = () => {
    const email = rentRequestEmail.trim();
    if (!isValidEmail(email)) {
      setRentRequestError("Введите корректный email.");
      return;
    }
    setRentRequestError("");
    setRentRequestStatus("success");
  };

  const closeRentRequestModal = () => {
    setIsRentRequestModalOpen(false);
    setRentRequestStatus("idle");
    setRentRequestError("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <section className="rounded-3xl border border-red-300/25 bg-gradient-to-r from-red-500/15 via-orange-500/10 to-fuchsia-500/10 p-6 shadow-[0_20px_50px_rgba(239,68,68,0.18)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-300/40 bg-red-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-100">
            <BoltIcon className="h-4 w-4" />
            Sport Mode
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Прямые спортивные трансляции на большом экране
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">
            Живой звук, фанатская атмосфера и комьюнити болельщиков в формате
            кинотеатра. Приходите командой и бронируйте лучшие места заранее.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">
            Календарь прямых трансляций
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {broadcasts.map((block) => (
              <article
                key={block.sport}
                className={`glass-card relative overflow-hidden rounded-2xl border p-4 bg-gradient-to-br ${block.accent}`}
              >
                <span
                  className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${block.stickerTone}`}
                >
                  <TrophyIcon className="h-3.5 w-3.5" />
                  {block.sticker}
                </span>
                <h3 className="text-lg font-semibold text-white/95">
                  {block.sport}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {block.matches.map((match) => (
                    <li
                      key={match}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      {match}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-4 lg:space-y-3">
            <div className="glass-card rounded-3xl p-5 sm:p-6 lg:-mt-2">
              <h2 className="text-2xl font-semibold">Фишки для болельщиков</h2>
              <div className="mt-4 space-y-3">
                {fanFeatures.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/12 bg-white/[0.03] p-3"
                    >
                      <div className="flex items-center gap-2 text-red-100">
                        <Icon className="h-5 w-5" />
                        <p className="font-semibold">{item.title}</p>
                      </div>
                      <p className="mt-1 text-sm text-white/75">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-5 sm:p-6">
              <h2 className="text-2xl font-semibold">Атмосфера и комьюнити</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/12">
                <div className="relative h-80">
                  <img
                    src={communityPhotos[communityIndex]}
                    alt="Атмосфера и комьюнити"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8">
                    <button
                      type="button"
                      onClick={() =>
                        setCommunityIndex(
                          (prev) =>
                            (prev - 1 + communityPhotos.length) %
                            communityPhotos.length,
                        )
                      }
                      className="rounded-lg border border-white/20 bg-black/45 p-1.5 text-white/90 transition hover:border-cyan-300/50"
                      aria-label="Предыдущее фото атмосферы"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCommunityIndex(
                          (prev) => (prev + 1) % communityPhotos.length,
                        )
                      }
                      className="rounded-lg border border-white/20 bg-black/45 p-1.5 text-white/90 transition hover:border-cyan-300/50"
                      aria-label="Следующее фото атмосферы"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {socialProof.map((item) => (
                  <li
                    key={item.text}
                    className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 transition hover:border-fuchsia-300/45 hover:bg-fuchsia-500/[0.07]"
                  >
                    <span>{item.text}</span>
                    <span
                      className={`ml-3 inline-flex shrink-0 items-center rounded-full border bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${item.stickerTone}`}
                    >
                      {item.sticker}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-5 sm:p-6">
              <h2 className="text-2xl font-semibold">Спортивное меню</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/12">
                <div className="relative h-80">
                  <img
                    src={menuPhotos[menuIndex]}
                    alt="Спортивное меню"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8">
                    <button
                      type="button"
                      onClick={() =>
                        setMenuIndex(
                          (prev) =>
                            (prev - 1 + menuPhotos.length) % menuPhotos.length,
                        )
                      }
                      className="rounded-lg border border-white/20 bg-black/45 p-1.5 text-white/90 transition hover:border-cyan-300/50"
                      aria-label="Предыдущее фото меню"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMenuIndex((prev) => (prev + 1) % menuPhotos.length)
                      }
                      className="rounded-lg border border-white/20 bg-black/45 p-1.5 text-white/90 transition hover:border-cyan-300/50"
                      aria-label="Следующее фото меню"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {menuItems.map((item) => (
                  <li
                    key={item.text}
                    className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 transition hover:border-orange-300/45 hover:bg-orange-500/[0.08]"
                  >
                    <span>{item.text}</span>
                    <span
                      className={`ml-3 inline-flex shrink-0 items-center rounded-full border bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${item.stickerTone}`}
                    >
                      {item.sticker}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-orange-300/45 bg-gradient-to-r from-orange-500/90 to-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.35)] transition hover:from-orange-400 hover:to-red-400"
              >
                <QrCodeIcon className="h-4 w-4" />
                Предзаказ по QR в зал
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTechIndex(0);
                setIsTechModalOpen(true);
              }}
              className="glass-card group w-full rounded-3xl border border-red-300/30 bg-gradient-to-r from-red-500/14 via-orange-500/10 to-fuchsia-500/10 p-5 text-left transition hover:border-red-300/55 hover:shadow-[0_18px_40px_rgba(239,68,68,0.22)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Техническое преимущество
                  </h2>
                  <p className="mt-2 text-sm text-white/75">
                    Открой модалку и посмотри фото с ключевыми преимуществами
                    зала.
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200/45 bg-gradient-to-br from-red-500/90 to-orange-500/90 text-white shadow-[0_10px_22px_rgba(239,68,68,0.35)]">
                  <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-fuchsia-300/30 bg-gradient-to-r from-fuchsia-500/10 via-rose-500/10 to-orange-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Групповое бронирование</h2>
          <p className="mt-2 max-w-3xl text-sm text-white/75">
            Для фан-клубов и компаний доступен выкуп целого зала с
            индивидуальным сценарием и меню.
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            <input
              value={bookingForm.date}
              onChange={(event) => {
                setBookingForm((prev) => ({
                  ...prev,
                  date: event.target.value,
                }));
                if (bookingFormError) setBookingFormError("");
                if (isLoggedInRequestSuccess)
                  setIsLoggedInRequestSuccess(false);
              }}
              placeholder="Дата матча"
              className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-red-300/50"
            />
            <input
              value={bookingForm.guests}
              onChange={(event) => {
                setBookingForm((prev) => ({
                  ...prev,
                  guests: event.target.value,
                }));
                if (bookingFormError) setBookingFormError("");
                if (isLoggedInRequestSuccess)
                  setIsLoggedInRequestSuccess(false);
              }}
              placeholder="Количество гостей"
              className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-red-300/50"
            />
            <input
              value={bookingForm.event}
              onChange={(event) => {
                setBookingForm((prev) => ({
                  ...prev,
                  event: event.target.value,
                }));
                if (bookingFormError) setBookingFormError("");
                if (isLoggedInRequestSuccess)
                  setIsLoggedInRequestSuccess(false);
              }}
              placeholder="Команда / событие"
              className="rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-red-300/50"
            />
          </div>
          {bookingFormError && (
            <p className="mt-3 text-sm text-rose-300">{bookingFormError}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleBookHall}
              className="inline-flex items-center gap-2 rounded-xl border border-red-300/45 bg-gradient-to-r from-red-500/90 to-orange-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(239,68,68,0.35)] transition hover:from-red-400 hover:to-orange-400"
            >
              <TicketIcon className="h-4 w-4" />
              Забронировать зал для компании
            </button>
          </div>
          {isLoggedInRequestSuccess && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200">
              <CheckCircleIcon className="h-5 w-5 text-emerald-300" />
              Мы с вами свяжемся
            </div>
          )}
        </section>
      </main>

      {isTechModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#05070f]/80 px-4 backdrop-blur-sm">
          <div className="glass-card relative w-full max-w-2xl rounded-3xl border border-white/15 p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setIsTechModalOpen(false)}
              className="absolute right-3 top-3 rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1 text-xs text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Закрыть
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/12">
              <img
                src={techBenefits[activeTechIndex].photo}
                alt={techBenefits[activeTechIndex].title}
                className="h-64 w-full object-cover sm:h-72"
                loading="lazy"
              />
            </div>

            <div className="mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                <CheckBadgeIcon className="h-4 w-4" />
                Тех-преимущество
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {techBenefits[activeTechIndex].title}
              </h3>
              <p className="mt-2 text-sm text-white/75">
                {techBenefits[activeTechIndex].text}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveTechIndex(
                    (prev) =>
                      (prev - 1 + techBenefits.length) % techBenefits.length,
                  )
                }
                className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/85 transition hover:border-cyan-300/45 hover:text-white"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Назад
              </button>

              <div className="flex items-center gap-1.5">
                {techBenefits.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveTechIndex(index)}
                    className={`h-2.5 rounded-full transition ${
                      index === activeTechIndex
                        ? `w-8 border bg-gradient-to-r ${item.stickerTone}`
                        : "w-2.5 bg-white/30 hover:bg-white/45"
                    }`}
                    aria-label={`Показать: ${item.title}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveTechIndex((prev) => (prev + 1) % techBenefits.length)
                }
                className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/85 transition hover:border-cyan-300/45 hover:text-white"
              >
                Далее
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog
        className="relative z-[95]"
        open={isRentRequestModalOpen}
        onClose={closeRentRequestModal}
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-md rounded-3xl border border-white/15 p-5 sm:p-6">
            {rentRequestStatus === "success" ? (
              <div className="text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/15">
                  <CheckCircleIcon className="h-8 w-8 text-emerald-300" />
                </div>
                <h3 className="mt-3 text-xl font-semibold text-emerald-200">
                  Мы скоро ответим
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Заявка принята. Напишем на почту{" "}
                  <span className="font-semibold text-cyan-200">
                    {rentRequestEmail.trim()}
                  </span>
                  .
                </p>
                <button
                  type="button"
                  onClick={closeRentRequestModal}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-cyan-300/35 hover:bg-white/[0.08]"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-yellow-300">
                  Почта для связи
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Вы не авторизованы. Укажите email для обратной связи по
                  аренде.
                </p>

                <div className="mt-4 rounded-xl border border-white/12 bg-white/[0.03] p-3">
                  <label className="text-xs text-white/60">Email</label>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-3 py-2">
                    <EnvelopeIcon className="h-4 w-4 text-cyan-200" />
                    <input
                      value={rentRequestEmail}
                      onChange={(event) => {
                        setRentRequestEmail(event.target.value);
                        if (rentRequestError) setRentRequestError("");
                      }}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/35 focus:outline-none"
                    />
                  </div>
                  {rentRequestError && (
                    <p className="mt-2 text-xs text-rose-300">
                      {rentRequestError}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={handleGuestRentRequest}
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-emerald-300/45 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)] transition hover:from-emerald-400 hover:to-teal-400"
                  >
                    Отправить
                  </button>
                  <button
                    type="button"
                    onClick={closeRentRequestModal}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:border-cyan-300/35"
                  >
                    Закрыть
                  </button>
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>

      <Footer />
    </div>
  );
}
