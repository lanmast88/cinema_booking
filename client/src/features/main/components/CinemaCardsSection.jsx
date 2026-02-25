import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

function CinemaCardSkeleton() {
  return (
    <article className="glass-card overflow-hidden rounded-3xl p-4 sm:p-5 animate-pulse">
      <div className="grid gap-5 md:grid-cols-[44%_56%] md:items-stretch">
        <div className="min-h-64 rounded-2xl bg-white/[0.07]" />
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-7 w-40 rounded-lg bg-white/[0.07]" />
              <div className="h-5 w-16 rounded-lg bg-white/[0.07]" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-white/[0.07]" />
              <div className="h-4 w-4/5 rounded bg-white/[0.07]" />
              <div className="h-4 w-3/5 rounded bg-white/[0.07]" />
            </div>
          </div>
          <div className="mt-5 space-y-2 pr-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-9 rounded-xl bg-white/[0.07]" />
            ))}
          </div>
          <div className="mt-5">
            <div className="h-9 w-48 rounded-xl bg-white/[0.07]" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CinemaCardsSection({ cinemas, loading, activeSlides, shiftSlide, selectCinemaFilter }) {
  if (loading) {
    return (
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <CinemaCardSkeleton />
        <CinemaCardSkeleton />
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2">
      {cinemas.map((cinema) => {
        const images = cinema.image_urls ?? [];
        const currentSlide = activeSlides[cinema.id] ?? 0;
        const currentImage = images[currentSlide];

        return (
          <article
            key={cinema.id}
            className="glass-card overflow-hidden rounded-3xl p-4 sm:p-5"
          >
            <div className="grid gap-5 md:grid-cols-[44%_56%] md:items-stretch">
              <div className="relative min-h-64 overflow-hidden rounded-2xl border border-white/10">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={`${cinema.name} ${currentSlide + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/[0.03] text-sm text-white/50">
                    Нет изображения
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-8">
                  <button
                    type="button"
                    onClick={() => shiftSlide(cinema.id, -1, images.length)}
                    className="rounded-lg border border-white/20 bg-black/40 p-1.5 text-white/85 transition hover:border-cyan-300/50 hover:text-cyan-100"
                    aria-label="Предыдущее фото"
                    disabled={images.length < 2}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {images.map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`h-1.5 rounded-full transition-all ${
                          dotIndex === currentSlide ? "w-5 bg-cyan-200" : "w-1.5 bg-white/55"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => shiftSlide(cinema.id, 1, images.length)}
                    className="rounded-lg border border-white/20 bg-black/40 p-1.5 text-white/85 transition hover:border-cyan-300/50 hover:text-cyan-100"
                    aria-label="Следующее фото"
                    disabled={images.length < 2}
                  >
                    <ChevronRightIcon className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold text-white/95">{cinema.name}</h2>
                    <span className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-200">
                      {cinema.city}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-white/70">{cinema.description}</p>
                </div>

                <div className="mt-5 space-y-2 pr-3">
                  {(cinema.advantages ?? []).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/85"
                    >
                      <MapPinIcon className="size-4 shrink-0 text-cyan-200" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-row items-center gap-3 flex-nowrap">
                  <button
                    type="button"
                    onClick={() => selectCinemaFilter(cinema.name)}
                    className="inline-flex max-w-full whitespace-normal rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-left text-sm font-semibold leading-snug text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
                  >
                    Добавить в фильтр расписания
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
