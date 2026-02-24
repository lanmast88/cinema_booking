import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";
import { register as registerApi } from "../api/auth";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Неверный email или пароль.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerApi(email, password);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Ошибка при регистрации.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-6 pb-10 pt-24 lg:grid-cols-[1fr_1.1fr]">
        <section className="hidden lg:block">
          <div className="glass-card rounded-3xl p-8">
            <h1 className="text-4xl font-semibold leading-tight">
              Добро пожаловать в
              <span className="bg-gradient-to-r from-[#85a7ff] via-[#7de7ff] to-[#d9a7ff] bg-clip-text text-transparent">
                {" "}
                Cinema Booking
              </span>
            </h1>
            <p className="mt-4 text-white/70">
              Вход в аккаунт открывает быстрый доступ к билетам, избранным
              фильмам и истории покупок.
            </p>

            <div className="mt-8 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                Мгновенное бронирование мест
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                Персональные рекомендации и акции
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                Удобное управление билетами
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-3xl p-5 sm:p-7">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-cyan-300/15 text-cyan-100"
                  : "text-white/60 hover:text-white/85"
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-cyan-300/15 text-cyan-100"
                  : "text-white/60 hover:text-white/85"
              }`}
            >
              Регистрация
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {mode === "login" ? (
            <form className="space-y-4" onSubmit={handleLogin}>
              <h2 className="text-2xl font-semibold">Вход в аккаунт</h2>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Пароль</span>
                <input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="btn-glossy w-full rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-50"
              >
                {loading ? "Входим..." : "Войти"}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <h2 className="text-2xl font-semibold">Создать аккаунт</h2>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Пароль</span>
                <input
                  type="password"
                  placeholder="Минимум 8 символов"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="btn-glossy w-full rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-50"
              >
                {loading ? "Регистрируем..." : "Зарегистрироваться"}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
