import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "./useAuth";
import BurgerMenu from "./BurgerMenu";

const navButtons = [
  { label: "Расписание", to: "/schedule" },
  { label: "Акции", to: "/offers" },
];

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#070911]/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full items-center justify-between px-2 pt-0.5 sm:px-6 lg:px-10">
        <NavLink to="/" className="flex shrink-0 items-center gap-3">
          <img
            alt="Cinema Booking"
            src={logo}
            className="h-20 w-9 rounded-lg object-cover pt-2"
          />
          <span className="hidden text-sm font-semibold tracking-wide text-white/90 sm:block">
            CINEMA BOOKING
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navButtons.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-100"
                    : "border-white/15 bg-white/[0.03] text-white/75 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <NavLink to="/user">
                <span className="hidden rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white/85 sm:inline-flex">
                  {user.name || user.email}
                </span>
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-red-300/35 bg-red-300/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-200/60 hover:bg-red-300/20"
              >
                Выйти
              </button>
            </div>
          ) : (
            <NavLink
              to="/auth"
              className="btn-glossy hidden rounded-xl px-4 py-2 text-sm font-semibold text-white/90 hover:text-white md:inline-flex"
            >
              Вход / Регистрация
            </NavLink>
          )}

          <BurgerMenu navButtons={navButtons} user={user} logout={logout} />
        </div>
      </div>
    </header>
  );
}
