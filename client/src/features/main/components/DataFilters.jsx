import { CalendarDaysIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function DataFilters({
  dayTabs,
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  priceFilter,
  setPriceFilter,
  timeFilter,
  setTimeFilter,
  cinemaFilter,
  setCinemaFilter,
  allCinemas,
  adm,
  openAddMovie,
}) {
  return (
    <div className="glass-card mt-6 rounded-3xl p-4 pb-8 sm:p-5 sm:pb-10 relative">
      <div className="flex flex-wrap gap-2">
        {dayTabs.map((day) => (
          <button
            key={day.key}
            type="button"
            onClick={() => setSelectedDate(day.key)}
            className={`rounded-xl border px-4 py-2 text-left transition ${
              selectedDate === day.key
                ? "border-cyan-300/55 bg-cyan-300/12 text-cyan-100"
                : "border-white/12 bg-white/[0.03] text-white/75 hover:border-cyan-300/35"
            }`}
          >
            <div className="text-sm font-semibold">{day.title}</div>
            <div className="text-xs opacity-80">{day.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <label className="relative xl:col-span-2">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white/45" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Поиск фильма, жанра или кинотеатра"
            className="w-full rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-cyan-300/50"
          />
        </label>

        <label className="relative">
          <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white/45" />
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="w-full rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          />
        </label>

        <label className="relative">
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
          <select
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            className="w-full appearance-none rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-3 pr-9 text-sm text-white outline-none transition focus:border-cyan-300/50"
          >
            <option value="all" className="bg-[#0b1020]">Цена: любая</option>
            <option value="under600" className="bg-[#0b1020]">До 600 ₽</option>
            <option value="600to750" className="bg-[#0b1020]">600–750 ₽</option>
            <option value="over750" className="bg-[#0b1020]">Свыше 750 ₽</option>
          </select>
        </label>

        <label className="relative">
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
          <select
            value={timeFilter}
            onChange={(event) => setTimeFilter(event.target.value)}
            className="w-full appearance-none rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-3 pr-9 text-sm text-white outline-none transition focus:border-cyan-300/50"
          >
            <option value="all" className="bg-[#0b1020]">Время: любое</option>
            <option value="morning" className="bg-[#0b1020]">Утро (до 12:00)</option>
            <option value="day" className="bg-[#0b1020]">День (12:00–18:00)</option>
            <option value="evening" className="bg-[#0b1020]">Вечер (18:00–23:00)</option>
            <option value="night" className="bg-[#0b1020]">Ночь (после 23:00)</option>
          </select>
        </label>

        <label className="relative">
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
          <select
            value={cinemaFilter}
            onChange={(event) => setCinemaFilter(event.target.value)}
            className="w-full max-w-xs appearance-none rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-3 pr-9 text-sm text-white outline-none transition focus:border-cyan-300/50"
          >
            <option value="all" className="bg-[#0b1020]">Кинотеатр: все</option>
            {allCinemas.map((cinemaName) => (
              <option key={cinemaName} value={cinemaName} className="bg-[#0b1020]">
                {cinemaName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {adm && (
        <button
          type="button"
          onClick={openAddMovie}
          className="absolute bottom-4 right-4 inline-flex max-w-full whitespace-normal rounded-xl border border-pink-300/50 bg-gradient-to-r from-pink-500/80 to-fuchsia-500/80 px-4 py-2 text-left text-sm font-semibold leading-snug text-white shadow-[0_10px_24px_rgba(236,72,153,0.35)] transition hover:from-pink-400/90 hover:to-fuchsia-400/90 hover:border-cyan-300/45 hover:bg-cyan-300/[0.08]"
        >
          Добавить фильм/сеанс
        </button>
      )}
    </div>
  );
}
