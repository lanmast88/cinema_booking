import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  CreditCardIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";
import NoLoginModal from "../features/main/components/NoLoginModal";
import sberPayIcon from "../assets/sber-pay.svg";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestEmailError, setGuestEmailError] = useState("");

  const {
    movieId,
    movieTitle,
    movieRating,
    movieGenre,
    movieDuration,
    session,
    seats,
    total,
  } = state ?? {};

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const startPayment = () => {
    if (paymentStatus !== "idle") return;
    setPaymentStatus("loading");

    setTimeout(() => {
      setPaymentStatus("success");
    }, 2200);
  };

  const handlePay = () => {
    if (user) {
      startPayment();
      return;
    }

    if (!isValidEmail(guestEmail.trim())) {
      setGuestEmailError("Введите корректный email, чтобы получить билет.");
      setIsGuestModalOpen(true);
      return;
    }

    startPayment();
  };

  const handleGuestConfirm = () => {
    if (!isValidEmail(guestEmail.trim())) {
      setGuestEmailError("Введите корректный email, чтобы получить билет.");
      return;
    }
    setGuestEmailError("");
    setIsGuestModalOpen(false);
    startPayment();
  };

  useEffect(() => {
    if (paymentStatus !== "success") return;

    const timer = setTimeout(() => {
      navigate("/", {
        state: {
          paidSession: {
            movieId,
            session,
            seats,
          },
        },
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [movieId, navigate, paymentStatus, seats, session]);

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-4xl px-6 pb-20 pt-28 lg:px-10">
        <section className="glass-card rounded-3xl p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Оплата заказа
          </h1>
          <p className="mt-2 text-sm text-white/70">
            После оплаты билеты будут доступны в вашем профиле и на почте.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
              <h2 className="text-lg font-semibold text-white/95">
                Детали сеанса
              </h2>
              <p className="mt-3 text-sm text-white/80">{movieTitle}</p>
              <p className="mt-1 text-sm text-white/65">
                {movieRating} · {movieGenre} · {movieDuration}
              </p>
              <p className="mt-3 text-sm text-cyan-100">
                {session?.cinema} · {session?.hall} · {session?.time}
              </p>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
              <h2 className="text-lg font-semibold text-white/95">
                Выбранные места
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {seats?.map(([row, seat], index) => (
                  <span
                    key={`${row}-${seat}-${index}`}
                    className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100"
                  >
                    Ряд {row}, место {seat}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/70">Итого</p>
              <p className="text-3xl font-semibold text-emerald-300">
                {total} ₽
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <h2 className="text-lg font-semibold text-white/95">
              Способ оплаты
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  paymentMethod === "card"
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                    : "border-white/15 bg-white/[0.03] text-white/80 hover:border-cyan-300/35"
                }`}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-200/40 bg-gradient-to-br from-cyan-400/85 to-blue-500/85 shadow-[0_8px_18px_rgba(34,211,238,0.35)]">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </span>
                Банковская карта
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("sbp")}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  paymentMethod === "sbp"
                    ? "border-pink-300/45 bg-pink-300/10 text-pink-100"
                    : "border-white/15 bg-white/[0.03] text-white/80 hover:border-pink-300/35"
                }`}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-pink-200/45 bg-gradient-to-br from-pink-400/85 to-fuchsia-500/85 shadow-[0_8px_18px_rgba(236,72,153,0.35)]">
                  <QrCodeIcon className="h-4 w-4 text-white" />
                </span>
                СБП
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("sberpay")}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  paymentMethod === "sberpay"
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                    : "border-white/15 bg-white/[0.03] text-white/80 hover:border-cyan-300/35"
                }`}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-emerald-200/45 bg-gradient-to-br from-emerald-400/85 to-green-500/85 shadow-[0_8px_18px_rgba(34,197,94,0.35)]">
                  <img
                    src={sberPayIcon}
                    alt="SberPay"
                    className="h-8 w-8 object-contain"
                  />
                </span>
                SberPay
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {paymentStatus === "idle" && (
              <button
                type="button"
                onClick={handlePay}
                className="rounded-xl border border-emerald-300/45 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition hover:from-emerald-400 hover:to-teal-400"
              >
                Оплатить
              </button>
            )}
            {paymentStatus === "loading" && (
              <div className="inline-flex items-center gap-3 rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2.5 text-sm font-medium text-cyan-100">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-100/30 border-t-cyan-100" />
                Соединение с банком...
              </div>
            )}
            {paymentStatus === "success" && (
              <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-200">
                <CheckCircleIcon className="h-5 w-5 text-emerald-300" />
                Оплата прошла успешно
              </div>
            )}
            <NavLink
              to="/"
              className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/[0.08]"
            >
              Вернуться на главную
            </NavLink>
          </div>
        </section>
      </main>

      <NoLoginModal
        open={isGuestModalOpen}
        onClose={() => {
          setIsGuestModalOpen(false);
          setGuestEmailError("");
        }}
        email={guestEmail}
        onEmailChange={(value) => {
          setGuestEmail(value);
          if (guestEmailError) setGuestEmailError("");
        }}
        onConfirm={handleGuestConfirm}
        error={guestEmailError}
      />

      <Footer />
    </div>
  );
}
