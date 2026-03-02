import { Dialog, DialogPanel } from "@headlessui/react";

export default function AdminSessionModal({
  open,
  onClose,
  adminSession,
  adminForm,
  setAdminForm,
  adminFormError,
  adminCreateMode,
  setAdminCreateMode,
  movies,
  saveAdminSession,
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="glass-card w-full max-w-2xl rounded-3xl p-5 sm:p-6 dialog-panel">
          {adminSession ? (
            <div className="mb-5 rounded-xl border border-pink-300/30 bg-pink-500/10 p-4">
              <h3 className="text-lg font-semibold text-pink-200">
                {adminSession.movieTitle}
              </h3>
              <p className="mt-1 text-sm text-white/75">
                {adminSession.movieRating} · {adminSession.movieGenre} ·{" "}
                {adminSession.movieDuration}
              </p>
              <p className="mt-2 text-sm text-white/80">
                Сеанс: {adminForm.time} · {adminForm.format} · {adminForm.cinema}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 rounded-xl border border-pink-300/30 bg-pink-500/10 p-4 text-sm text-white/80">
                Режим создания: выберите, что добавить.
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAdminCreateMode("movie")}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    adminCreateMode === "movie"
                      ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-100"
                      : "border-white/12 bg-white/[0.03] text-white/75 hover:border-cyan-300/35"
                  }`}
                >
                  Добавить фильм
                </button>
                <button
                  type="button"
                  onClick={() => setAdminCreateMode("session")}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    adminCreateMode === "session"
                      ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-100"
                      : "border-white/12 bg-white/[0.03] text-white/75 hover:border-cyan-300/35"
                  }`}
                >
                  Добавить сеанс
                </button>
              </div>
            </>
          )}

          {!adminSession && adminCreateMode === "movie" && (
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-white/80">
                Название фильма
                <input
                  type="text"
                  value={adminForm.title}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Возрастной рейтинг
                <input
                  type="text"
                  value={adminForm.rating}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      rating: event.target.value,
                    }))
                  }
                  placeholder="Например: 16+"
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Жанр / категория
                <input
                  type="text"
                  value={adminForm.genre}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      genre: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Длительность
                <input
                  type="text"
                  value={adminForm.duration}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      duration: event.target.value,
                    }))
                  }
                  placeholder="Например: 120 или 2ч 15м"
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80 sm:col-span-2">
                Постер (URL)
                <input
                  type="text"
                  value={adminForm.poster}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      poster: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
            </div>
          )}

          {(adminSession || adminCreateMode === "session") && !adminSession && (
            <div className="mb-4">
              <label className="text-sm text-white/80">
                Фильм для нового сеанса
                <select
                  value={adminForm.targetMovieId}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      targetMovieId: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                >
                  <option value="" className="bg-[#0b1020]">
                    Выберите фильм
                  </option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id} className="bg-[#0b1020]">
                      {movie.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {(adminSession || adminCreateMode === "session" || adminCreateMode === "movie") && (
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-white/80">
                День
                <select
                  value={adminForm.dayOffset}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      dayOffset: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                >
                  <option value="0" className="bg-[#0b1020]">
                    Сегодня
                  </option>
                  <option value="1" className="bg-[#0b1020]">
                    Завтра
                  </option>
                  <option value="2" className="bg-[#0b1020]">
                    Через 2 дня
                  </option>
                  <option value="3" className="bg-[#0b1020]">
                    Через 3 дня
                  </option>
                </select>
              </label>
              <label className="text-sm text-white/80">
                Время
                <input
                  type="time"
                  value={adminForm.time}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      time: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Цена
                <input
                  type="number"
                  min="0"
                  value={adminForm.price}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Формат
                <input
                  type="text"
                  value={adminForm.format}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      format: event.target.value,
                    }))
                  }
                  placeholder="2D, IMAX..."
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Зал (ID)
                <input
                  type="text"
                  value={adminForm.hall}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      hall: event.target.value,
                    }))
                  }
                  placeholder="Например: 1"
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Кинотеатр
                <input
                  type="text"
                  value={adminForm.cinema}
                  onChange={(event) =>
                    setAdminForm((prev) => ({
                      ...prev,
                      cinema: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>
            </div>
          )}

          {adminFormError && (
            <p className="mb-4 rounded-xl border border-rose-300/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {adminFormError}
            </p>
          )}

          {adminSession && (
            <div className="mb-4 space-y-3">
              {adminSession?.purchasedSeats?.map((seat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2"
                >
                  <span className="rounded-2xl p-4">
                    Ряд {seat[0]}, место {seat[1]}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={saveAdminSession}
              className="w-full rounded-xl bg-emerald-500 py-2 font-semibold text-white transition hover:bg-emerald-400"
            >
              {adminSession
                ? "Сохранить сеанс"
                : adminCreateMode === "session"
                  ? "Добавить сеанс"
                  : "Добавить фильм"}
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-pink-500 py-2 font-semibold text-white hover:bg-pink-400 transition"
            >
              Закрыть
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
