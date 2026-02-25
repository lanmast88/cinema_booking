import { NavLink } from "react-router-dom";

const mainLinks = [
  { to: "/", label: "Расписание" },
  { to: "/events", label: "События" },
  { to: "/sport", label: "Спорт" },
  { to: "/rent", label: "Аренда зала" },
  { to: "/offers", label: "Акции" },
];

const profileLinks = [
  { to: "/auth", label: "Вход / Регистрация" },
  { to: "/user", label: "Личный кабинет" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 mt-12 border-t border-white/10">

      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 md:grid-cols-3 lg:px-10">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white/95">
            Навигация
          </h3>
          <div className="space-y-2">
            {mainLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={scrollToTop}
                className="block text-sm text-white/70 transition hover:text-cyan-100"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white/95">Профиль</h3>
          <div className="space-y-2">
            {profileLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={scrollToTop}
                className="block text-sm text-white/70 transition hover:text-cyan-100"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white/95">Контакты</h3>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <p className="text-sm text-white/80">Cinema Booking</p>
            <p className="mt-2 text-sm text-white/65">8 (343) 221-67-07</p>
            <p className="text-xs text-white/50">ежедневно 10:00-23:00</p>
            <button
              type="button"
              className="mt-4 w-fit rounded-full border border-pink-300/50 bg-gradient-to-r from-pink-500/85 to-fuchsia-500/85 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(236,72,153,0.3)] transition hover:from-pink-400/90 hover:to-fuchsia-400/90"
            >
              Написать в поддержку
            </button>
          </div>
        </div>
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} Cinema Booking
        </p>
      </div>
    </footer>
  );
}
