import { Dialog, DialogPanel } from "@headlessui/react";

export default function AdminSessionModal({ open, onClose, adminSession, adminForm, setAdminForm, saveAdminSession }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="glass-card w-full max-w-2xl rounded-3xl p-5 sm:p-6 dialog-panel">
          {adminSession ? (
            <div className="mb-5 rounded-xl border border-pink-300/30 bg-pink-500/10 p-4">
              <h3 className="text-lg font-semibold text-pink-200">{adminSession.movieTitle}</h3>
              <p className="mt-1 text-sm text-white/75">{adminSession.movieRating} · {adminSession.movieGenre} · {adminSession.movieDuration}</p>
              <p className="mt-2 text-sm text-white/80">Сеанс: {adminForm.time} · {adminSession.format} · {adminForm.cinema}</p>
            </div>
          ) : (
            <div className="mb-5 rounded-xl border border-pink-300/30 bg-pink-500/10 p-4 text-sm text-white/80">
              Режим добавления нового фильма/сеанса
            </div>
          )}
          {adminSession && (
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-white/80">День
                <select value={adminForm.dayOffset} onChange={(event) => setAdminForm((prev) => ({ ...prev, dayOffset: event.target.value }))} className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50">
                  <option value="0" className="bg-[#0b1020]">Сегодня</option>
                  <option value="1" className="bg-[#0b1020]">Завтра</option>
                  <option value="2" className="bg-[#0b1020]">Через 2 дня</option>
                  <option value="3" className="bg-[#0b1020]">Через 3 дня</option>
                </select>
              </label>
              <label className="text-sm text-white/80">Время
                <input type="time" value={adminForm.time} onChange={(event) => setAdminForm((prev) => ({ ...prev, time: event.target.value }))} className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50" />
              </label>
              <label className="text-sm text-white/80">Цена
                <input type="number" min="0" value={adminForm.price} onChange={(event) => setAdminForm((prev) => ({ ...prev, price: event.target.value }))} className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50" />
              </label>
              <label className="text-sm text-white/80">Формат
                <input type="text" value={adminForm.format} onChange={(event) => setAdminForm((prev) => ({ ...prev, format: event.target.value }))} className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50" />
              </label>
              <label className="text-sm text-white/80">Зал
                <input type="text" value={adminForm.hall} onChange={(event) => setAdminForm((prev) => ({ ...prev, hall: event.target.value }))} className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50" />
              </label>
              <label className="text-sm text-white/80">Кинотеатр
                <input type="text" value={adminForm.cinema} onChange={(event) => setAdminForm((prev) => ({ ...prev, cinema: event.target.value }))} className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50" />
              </label>
            </div>
          )}
          <div className="mt-4 mb-4 space-y-3">
            {adminSession?.purchasedSeats?.map((seat, index) => (
              <div key={index} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                <span className="rounded-2xl p-4">Ряд {seat[0]}, место {seat[1]}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {adminSession && (
              <button onClick={saveAdminSession} className="w-full rounded-xl bg-emerald-500 py-2 font-semibold text-white transition hover:bg-emerald-400">
                Сохранить сеанс
              </button>
            )}
            <button onClick={onClose} className="w-full rounded-xl bg-pink-500 py-2 font-semibold text-white hover:bg-pink-400 transition">Закрыть</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
