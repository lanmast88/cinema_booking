import { Dialog, DialogPanel } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function NoLoginModal({
  open,
  onClose,
  email,
  onEmailChange,
  onConfirm,
  error,
}) {
  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="glass-card w-full max-w-md rounded-3xl p-5 sm:p-6 dialog-panel">
          <h3 className="text-xl font-semibold text-yellow-300">Почта для билета</h3>
          <p className="mt-2 text-sm text-white/70">
            Вы не авторизованы. Введите email, чтобы получить электронный билет
            после оплаты.
          </p>

          <div className="mt-4 rounded-xl border border-white/12 bg-white/[0.03] p-3">
            <label className="text-xs text-white/60">Email</label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-3 py-2">
              <EnvelopeIcon className="h-4 w-4 text-cyan-200" />
              <input
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/35 focus:outline-none"
              />
            </div>
            {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-emerald-300/45 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)] transition hover:from-emerald-400 hover:to-teal-400"
            >
              Продолжить оплату
            </button>
            <NavLink
              to="/auth"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
            >
              Войти
            </NavLink>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:border-cyan-300/35"
            >
              Закрыть
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
