import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function BurgerMenu({ navButtons, user, logout }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-xl border border-white/15 bg-white/[0.03] p-2 text-white/90 transition hover:border-cyan-300/45 hover:text-cyan-100 md:hidden"
        aria-label="Открыть меню"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="fixed inset-y-0 right-0 flex w-full max-w-xs">
          <DialogPanel className="glass-card ml-auto flex h-full w-full flex-col rounded-none border-l border-white/10 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide text-white/90">
                Навигация
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/15 bg-white/[0.03] p-1.5 text-white/90 transition hover:border-cyan-300/45 hover:text-cyan-100"
                aria-label="Закрыть меню"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {navButtons.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl border px-3 py-2 text-sm font-medium transition ${
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

            <div className="mt-6 border-t border-white/10 pt-4">
              {user ? (
                <div className="space-y-2">
                  <NavLink
                    to="/user"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white/85 transition hover:border-cyan-300/40 hover:text-cyan-200"
                  >
                    {user.name || user.email}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full rounded-xl border border-red-300/35 bg-red-300/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-200/60 hover:bg-red-300/20"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="btn-glossy block rounded-xl px-4 py-2 text-center text-sm font-semibold text-white/90 hover:text-white"
                >
                  Вход / Регистрация
                </NavLink>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
