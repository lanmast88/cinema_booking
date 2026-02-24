import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";

const orderHistoryMock = [
  {
    id: "ORD-10391",
    movie: "Аватар: Пламя и пепел",
    cinema: "Cinema Star",
    date: "2026-02-20",
    time: "19:30",
    seats: "Ряд 5, места 7-8",
    total: 1600,
    status: "Оплачен",
  },
  {
    id: "ORD-10322",
    movie: "Возвращение в Сайлент Хилл",
    cinema: "Nova Cinema",
    date: "2026-02-12",
    time: "21:30",
    seats: "Ряд 9, место 4",
    total: 780,
    status: "Оплачен",
  },
  {
    id: "ORD-10277",
    movie: "Зверополис 2",
    cinema: "Cinema Star",
    date: "2026-01-28",
    time: "13:10",
    seats: "Ряд 3, места 1-3",
    total: 1560,
    status: "Посещен",
  },
];

function formatDate(iso) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function UserPage() {
  const { user, updateUser } = useAuth();

  const [loginValue, setLoginValue] = useState(user?.name || "");
  const [emailValue, setEmailValue] = useState(user?.email || "");
  const [profileMessage, setProfileMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const orderHistory = useMemo(() => orderHistoryMock, []);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleProfileSave = (event) => {
    event.preventDefault();

    const normalizedLogin = loginValue.trim();
    const normalizedEmail = emailValue.trim();

    if (!normalizedLogin || !normalizedEmail) {
      setProfileMessage("Заполни логин и email.");
      return;
    }

    updateUser({ name: normalizedLogin, email: normalizedEmail });
    setProfileMessage("Профиль обновлен.");
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Заполни все поля для смены пароля.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("Новый пароль должен быть минимум 8 символов.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Подтверждение пароля не совпадает.");
      return;
    }

    updateUser({ password: newPassword });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Пароль успешно изменен.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />
      <Header />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Личный кабинет
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="glass-card rounded-3xl p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Логин и профиль</h2>
            <p className="mt-1 text-sm text-white/65">
              Тестовые данные ток для теста
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleProfileSave}>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Логин</span>
                <input
                  type="text"
                  value={loginValue}
                  onChange={(event) => setLoginValue(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email</span>
                <input
                  type="email"
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>

              {profileMessage && (
                <p className="text-sm text-cyan-200">{profileMessage}</p>
              )}

              <button
                type="submit"
                className="btn-glossy rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                Сохранить профиль
              </button>
            </form>
          </section>

          <section className="glass-card rounded-3xl p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Смена пароля</h2>
            <p className="mt-1 text-sm text-white/65">
              Тестовые данные ток для теста (сохраняются в контексте)
            </p>

            <form className="mt-5 space-y-4" onSubmit={handlePasswordChange}>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">
                  Текущий пароль
                </span>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">
                  Новый пароль
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/70">
                  Подтверждение нового пароля
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>

              {passwordMessage && (
                <p className="text-sm text-cyan-200">{passwordMessage}</p>
              )}

              <button
                type="submit"
                className="btn-glossy rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                Обновить пароль
              </button>
            </form>
          </section>
        </div>

        <section className="glass-card mt-6 rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">История заказов</h2>
            <Link
              to="/schedule"
              className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-sm font-medium text-white/80 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              К расписанию
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {orderHistory.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white/95">
                    {order.movie}
                  </h3>
                  <span className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-200">
                    {order.status}
                  </span>
                </div>

                <div className="mt-2 grid gap-2 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-4">
                  <p>Заказ: {order.id}</p>
                  <p>Кинотеатр: {order.cinema}</p>
                  <p>
                    Дата: {formatDate(order.date)} · {order.time}
                  </p>
                  <p>Сумма: {order.total} ₽</p>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Места: {order.seats}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
