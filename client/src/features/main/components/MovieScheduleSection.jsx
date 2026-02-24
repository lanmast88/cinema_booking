export default function MovieScheduleSection({
  filteredSchedule,
  adm,
  setMovieToDelete,
  setSelectedSession,
  openAdminForSession,
}) {
  return (
    <div className="mt-6 space-y-4">
      {filteredSchedule.map((movie) => (
        <article
          key={movie.id}
          className="glass-card relative rounded-3xl p-4 sm:p-5"
        >
          {adm && (
            <button
              type="button"
              onClick={() => setMovieToDelete(movie)}
              className="group/delete absolute right-4 top-4 z-20 inline-flex items-center rounded-xl border border-rose-300/60 bg-gradient-to-r from-rose-500/90 to-red-500/85 px-2.5 py-1.5 text-white shadow-[0_10px_24px_rgba(244,63,94,0.38)] transition-all duration-200 hover:from-rose-400/95 hover:to-red-400/90"
            >
              <span className="text-base leading-none">×</span>
              <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold opacity-0 transition-all duration-500 group-hover/delete:ml-2 group-hover/delete:max-w-24 group-hover/delete:opacity-100">
                Удалить фильм
              </span>
            </button>
          )}
          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-56 w-full rounded-2xl object-cover"
            />

            <div>
              <h3 className="text-2xl font-semibold text-yellow-300">
                {movie.title}
              </h3>
              <p className="mt-1 text-sm text-white/75">
                {movie.rating} · {movie.genre} · {movie.duration}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {movie.screenings.map((session, index) => (
                  <div
                    key={`${movie.id}-${session.time}-${index}`}
                    className="group relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSession({
                          movieTitle: movie.title,
                          movieId: movie.id,
                          moviePoster: movie.poster,
                          movieRating: movie.rating,
                          movieGenre: movie.genre,
                          movieDuration: movie.duration,
                          session,
                        })
                      }
                      className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/[0.08]"
                    >
                      <div className="text-xs text-white/60">
                        {session.format} · {session.hall}
                      </div>
                      <div className="text-xs text-cyan-200">
                        {session.cinema}
                      </div>
                      <div className="mt-1 text-3xl font-semibold text-yellow-300">
                        {session.time}
                      </div>
                      <div className="text-base font-medium text-white">
                        {session.price} ₽
                      </div>
                    </button>
                    {adm && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openAdminForSession(movie, session, index);
                        }}
                        className="absolute right-2 top-2 z-20 inline-flex rounded-lg border border-pink-300/50 bg-gradient-to-r from-pink-500/80 to-fuchsia-500/80 px-2 py-1 text-white shadow-[0_10px_24px_rgba(236,72,153,0.35)] transition-all hover:from-pink-400/90 hover:to-fuchsia-400/90 group-hover:-translate-y-0.5"
                        aria-label="Открыть панель администратора для сеанса"
                      >
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}

      {filteredSchedule.length === 0 && (
        <div className="glass-card rounded-2xl p-8 text-center text-white/70">
          По выбранным фильтрам сеансов не найдено.
        </div>
      )}
    </div>
  );
}
