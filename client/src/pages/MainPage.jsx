import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";
import { getCinemas } from "../api/cinemas";
import SeatPickerModal from "../features/main/components/SeatPickerModal";
import AdminSessionModal from "../features/main/components/AdminSessionModal";
import DeleteMovieDialog from "../features/main/components/DeleteMovieDialog";
import CinemaCardsSection from "../features/main/components/CinemaCardsSection";
import DataFilters from "../features/main/components/DataFilters";
import MovieScheduleSection from "../features/main/components/MovieScheduleSection";
import {
  emptyAdminForm,
  scheduleMovies,
  seatsData,
} from "../features/main/data/scheduleMovies";
import {
  formatDateLabel,
  formatTabTitle,
  getBaseDate,
  getDateByOffset,
  getHour,
  toDateKey,
} from "../features/main/utils/date";

export default function MainPage() {
  const [activeSlides, setActiveSlides] = useState({});

  const dayTabs = useMemo(() => {
    return Array.from({ length: 4 }, (_, offset) => {
      const date = getDateByOffset(offset);
      return {
        key: toDateKey(date),
        title: formatTabTitle(date, offset),
        label: formatDateLabel(date),
      };
    });
  }, []);
  const { adm } = useAuth();
  const initialDate = dayTabs[0]?.key ?? toDateKey(getBaseDate());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [cinemaFilter, setCinemaFilter] = useState("all");
  const [selectedSession, setSelectedSession] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [moviesData, setMoviesData] = useState(scheduleMovies);
  const [adminSession, setAdminSession] = useState(null);
  const [adminForm, setAdminForm] = useState(emptyAdminForm);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    getCinemas()
      .then((res) => setCinemas(res.data))
      .catch(() => {});
  }, []);

  const plusChosenSeat = (row, seat) => {
    setChosenSeats((prev) => {
      const exists = prev.some(([r, s]) => r === row && s === seat);
      if (exists) return prev;
      return [...prev, [row, seat]];
    });
  };

  const removeChosenSeat = (row, seat) => {
    setChosenSeats((prev) =>
      prev.filter(([r, s]) => !(r === row && s === seat)),
    );
  };

  const plusPurchasedSeats = (seats) => {
    if (!selectedSession || seats.length === 0) return;

    setMoviesData((prev) =>
      prev.map((movie) => {
        if (movie.id !== selectedSession.movieId) return movie;

        return {
          ...movie,
          screenings: movie.screenings.map((session) => {
            const isTargetSession =
              session.dayOffset === selectedSession.session.dayOffset &&
              session.time === selectedSession.session.time &&
              session.hall === selectedSession.session.hall &&
              session.cinema === selectedSession.session.cinema;

            if (!isTargetSession) return session;

            const existingSeats = session.purchasedSeats ?? [];
            const mergedSeats = [...existingSeats];

            seats.forEach(([row, seat]) => {
              const alreadyExists = mergedSeats.some(
                ([r, s]) => r === row && s === seat,
              );
              if (!alreadyExists) {
                mergedSeats.push([row, seat]);
              }
            });

            return {
              ...session,
              purchasedSeats: mergedSeats,
            };
          }),
        };
      }),
    );

    setSelectedSession((prev) => {
      if (!prev) return prev;
      const existingSeats = prev.session.purchasedSeats ?? [];
      const mergedSeats = [...existingSeats];

      seats.forEach(([row, seat]) => {
        const alreadyExists = mergedSeats.some(
          ([r, s]) => r === row && s === seat,
        );
        if (!alreadyExists) {
          mergedSeats.push([row, seat]);
        }
      });

      return {
        ...prev,
        session: {
          ...prev.session,
          purchasedSeats: mergedSeats,
        },
      };
    });
    setChosenSeats([]);
  };

  const allCinemas = useMemo(() => {
    const unique = new Set(
      moviesData.flatMap((movie) =>
        movie.screenings.map((session) => session.cinema),
      ),
    );
    return Array.from(unique);
  }, [moviesData]);

  const shiftSlide = (cinemaId, direction, imagesLength) => {
    setActiveSlides((prev) => {
      const current = prev[cinemaId] ?? 0;
      const next = (current + direction + imagesLength) % imagesLength;
      return { ...prev, [cinemaId]: next };
    });
  };

  const filteredSchedule = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return moviesData
      .map((movie) => {
        const screenings = movie.screenings.filter((session) => {
          const sessionDate = toDateKey(getDateByOffset(session.dayOffset));
          if (sessionDate !== selectedDate) return false;

          if (cinemaFilter !== "all" && session.cinema !== cinemaFilter)
            return false;

          if (priceFilter === "under600" && session.price >= 600) return false;
          if (
            priceFilter === "600to750" &&
            (session.price < 600 || session.price > 750)
          )
            return false;
          if (priceFilter === "over750" && session.price <= 750) return false;

          const hour = getHour(session.time);
          if (timeFilter === "morning" && hour >= 12) return false;
          if (timeFilter === "day" && (hour < 12 || hour >= 18)) return false;
          if (timeFilter === "evening" && (hour < 18 || hour >= 23))
            return false;
          if (timeFilter === "night" && hour < 23) return false;

          return true;
        });

        return { ...movie, screenings };
      })
      .filter((movie) => {
        if (movie.screenings.length === 0) return false;
        if (!query) return true;

        const byTitle = movie.title.toLowerCase().includes(query);
        const byGenre = movie.genre.toLowerCase().includes(query);
        const byCinema = movie.screenings.some((session) =>
          session.cinema.toLowerCase().includes(query),
        );

        return byTitle || byGenre || byCinema;
      });
  }, [
    cinemaFilter,
    moviesData,
    priceFilter,
    searchQuery,
    selectedDate,
    timeFilter,
  ]);

  const selectCinemaFilter = (cinemaName) => {
    setCinemaFilter(cinemaName);
    const scheduleSection = document.getElementById("schedule-section");
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const deleteMovieById = (movieId) => {
    setMoviesData((prev) => prev.filter((movie) => movie.id !== movieId));
    if (selectedSession?.movieId === movieId) {
      setSelectedSession(null);
    }
  };

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const openAdminForSession = (movie, session, sessionIndex) => {
    setAdminSession({
      movieId: movie.id,
      movieTitle: movie.title,
      movieRating: movie.rating,
      movieGenre: movie.genre,
      movieDuration: movie.duration,
      sessionIndex,
      ...session,
    });
    setAdminForm({
      dayOffset: String(session.dayOffset ?? 0),
      time: session.time ?? "",
      price: String(session.price ?? ""),
      format: session.format ?? "",
      hall: session.hall ?? "",
      cinema: session.cinema ?? "",
    });
    setIsAdminPanelOpen(true);
  };

  const closeAdminPanel = () => {
    setIsAdminPanelOpen(false);
    setAdminSession(null);
    setAdminForm(emptyAdminForm);
  };

  const saveAdminSession = () => {
    if (!adminSession) return;

    setMoviesData((prev) =>
      prev.map((movie) => {
        if (movie.id !== adminSession.movieId) return movie;

        return {
          ...movie,
          screenings: movie.screenings.map((session, index) => {
            if (index !== adminSession.sessionIndex) return session;

            const parsedPrice = Number(adminForm.price);

            return {
              ...session,
              dayOffset: Number(adminForm.dayOffset),
              time: adminForm.time.trim() || session.time,
              price: Number.isFinite(parsedPrice) ? parsedPrice : session.price,
              format: adminForm.format.trim() || session.format,
              hall: adminForm.hall.trim() || session.hall,
              cinema: adminForm.cinema.trim() || session.cinema,
            };
          }),
        };
      }),
    );

    closeAdminPanel();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Наши кинотеатры
        </h1>

        <CinemaCardsSection
          cinemas={cinemas}
          activeSlides={activeSlides}
          shiftSlide={shiftSlide}
          selectCinemaFilter={selectCinemaFilter}
        />

        <section id="schedule-section" className="mt-14 scroll-mt-28">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Расписание сеансов
          </h2>

          <DataFilters
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            cinemaFilter={cinemaFilter}
            setCinemaFilter={setCinemaFilter}
            allCinemas={allCinemas}
            dayTabs={dayTabs}
            adm={adm}
            setAdminSession={setAdminSession}
            setAdminForm={setAdminForm}
            emptyAdminForm={emptyAdminForm}
            setIsAdminPanelOpen={setIsAdminPanelOpen}
          />

          <MovieScheduleSection
            filteredSchedule={filteredSchedule}
            adm={adm}
            setMovieToDelete={setMovieToDelete}
            setSelectedSession={setSelectedSession}
            openAdminForSession={openAdminForSession}
          />
        </section>
      </main>
      <Footer />
      <SeatPickerModal
        open={Boolean(selectedSession)}
        onClose={() => setSelectedSession(null)}
        selectedSession={selectedSession}
        seatsData={seatsData}
        chosenSeats={chosenSeats}
        plusChosenSeat={plusChosenSeat}
        removeChosenSeat={removeChosenSeat}
        plusPurchasedSeats={plusPurchasedSeats}
      />
      <AdminSessionModal
        open={isAdminPanelOpen}
        onClose={closeAdminPanel}
        adminSession={adminSession}
        adminForm={adminForm}
        setAdminForm={setAdminForm}
        saveAdminSession={saveAdminSession}
      />
      <DeleteMovieDialog
        movieToDelete={movieToDelete}
        onClose={() => setMovieToDelete(null)}
        onConfirm={() => {
          deleteMovieById(movieToDelete.id);
          setMovieToDelete(null);
        }}
      />
    </div>
  );
}
