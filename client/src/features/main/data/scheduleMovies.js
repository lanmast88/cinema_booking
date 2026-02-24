import movie1 from "../../../assets/movie1.jpg";
import movie2 from "../../../assets/movie2.webp";
import movie3 from "../../../assets/movie3.webp";
import movie4 from "../../../assets/movie4.webp";
import movie5 from "../../../assets/movie5.webp";
import movie6 from "../../../assets/movie6.webp";
import movie7 from "../../../assets/movie7.webp";
import movie8 from "../../../assets/movie8.webp";
import movie9child from "../../../assets/movie9child.webp";
import movie10child from "../../../assets/movie10child.webp";
import movie11child from "../../../assets/movie11child.png";
import movie12 from "../../../assets/movie12.webp";

export const scheduleMovies = [
  {
    id: "movie-1",
    title: "Аватар: Пламя и пепел",
    genre: "Фантастика, Приключения",
    duration: "3ч 20м",
    rating: "12+",
    poster: movie1,
    screenings: [
      { dayOffset: 0, time: "16:40", price: 600, format: "2D", hall: "Зал 4", cinema: "Cinema Star", purchasedSeats: [[1, 3], [2, 7], [3, 5]] },
      { dayOffset: 0, time: "19:30", price: 800, format: "IMAX", hall: "Зал 1", cinema: "Cinema Star" },
      { dayOffset: 1, time: "18:20", price: 650, format: "2D", hall: "Зал 2", cinema: "Nova Cinema" },
      { dayOffset: 2, time: "21:10", price: 700, format: "Dolby", hall: "Зал 3", cinema: "Cinema Star" },
      { dayOffset: 3, time: "23:30", price: 760, format: "2D", hall: "VIP", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-2",
    title: "Грозовой перевал",
    genre: "Мелодрама, Драма",
    duration: "2ч 30м",
    rating: "16+",
    poster: movie2,
    screenings: [
      { dayOffset: 0, time: "14:10", price: 500, format: "2D", hall: "Зал 5", cinema: "Nova Cinema" },
      { dayOffset: 1, time: "17:50", price: 650, format: "2D", hall: "Зал 2", cinema: "Cinema Star" },
      { dayOffset: 2, time: "11:40", price: 520, format: "2D", hall: "Зал 2", cinema: "Cinema Star" },
      { dayOffset: 3, time: "20:40", price: 700, format: "2D", hall: "Зал 1", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-3",
    title: "На помощь!",
    genre: "Триллер",
    duration: "2ч 10м",
    rating: "18+",
    poster: movie3,
    screenings: [
      { dayOffset: 0, time: "13:20", price: 580, format: "2D", hall: "Зал 3", cinema: "Cinema Star" },
      { dayOffset: 1, time: "18:40", price: 700, format: "Dolby", hall: "Зал 4", cinema: "Nova Cinema" },
      { dayOffset: 2, time: "22:10", price: 760, format: "2D", hall: "Зал 6", cinema: "Cinema Star" },
      { dayOffset: 3, time: "23:50", price: 820, format: "2D", hall: "VIP", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-4",
    title: "Казнить нельзя помиловать",
    genre: "Триллер, Боевик, Детектив, Криминал, Фантастика, Драма",
    duration: "1ч 55м",
    rating: "16+",
    poster: movie4,
    screenings: [
      { dayOffset: 0, time: "22:20", price: 750, format: "2D", hall: "Зал 6", cinema: "Cinema Star" },
      { dayOffset: 1, time: "20:00", price: 700, format: "Dolby", hall: "Зал 2", cinema: "Nova Cinema" },
      { dayOffset: 2, time: "23:10", price: 800, format: "2D", hall: "VIP", cinema: "Cinema Star" },
      { dayOffset: 3, time: "16:10", price: 640, format: "2D", hall: "Зал 3", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-5",
    title: "Горничная",
    genre: "Триллер",
    duration: "2ч 25м",
    rating: "16+",
    poster: movie5,
    screenings: [
      { dayOffset: 0, time: "12:00", price: 540, format: "2D", hall: "Зал 2", cinema: "Nova Cinema" },
      { dayOffset: 1, time: "16:30", price: 630, format: "2D", hall: "Зал 5", cinema: "Cinema Star" },
      { dayOffset: 2, time: "20:20", price: 710, format: "2D", hall: "Зал 4", cinema: "Nova Cinema" },
      { dayOffset: 3, time: "22:40", price: 790, format: "Dolby", hall: "VIP", cinema: "Cinema Star" },
    ],
  },
  {
    id: "movie-6",
    title: "Свист",
    genre: "Хоррор",
    duration: "1ч 50м",
    rating: "18+",
    poster: movie6,
    screenings: [
      { dayOffset: 0, time: "15:10", price: 610, format: "2D", hall: "Зал 1", cinema: "Cinema Star" },
      { dayOffset: 1, time: "21:20", price: 760, format: "2D", hall: "Зал 3", cinema: "Nova Cinema" },
      { dayOffset: 2, time: "23:15", price: 830, format: "Dolby", hall: "Зал 2", cinema: "Cinema Star" },
      { dayOffset: 3, time: "10:40", price: 470, format: "2D", hall: "Зал 5", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-7",
    title: "Опасный дуэт",
    genre: "Комедия, Боевик",
    duration: "2ч 15м",
    rating: "16+",
    poster: movie7,
    screenings: [
      { dayOffset: 0, time: "11:15", price: 500, format: "2D", hall: "Зал 2", cinema: "Cinema Star" },
      { dayOffset: 1, time: "14:50", price: 620, format: "2D", hall: "Зал 1", cinema: "Nova Cinema" },
      { dayOffset: 2, time: "19:40", price: 730, format: "Dolby", hall: "Зал 4", cinema: "Cinema Star" },
      { dayOffset: 3, time: "21:55", price: 780, format: "2D", hall: "Зал 6", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-8",
    title: "Возвращение в Сайлент Хилл",
    genre: "Хоррор",
    duration: "2ч",
    rating: "16+",
    poster: movie8,
    screenings: [
      { dayOffset: 0, time: "18:00", price: 650, format: "2D", hall: "Зал 3", cinema: "Nova Cinema" },
      { dayOffset: 1, time: "12:30", price: 560, format: "2D", hall: "Зал 3", cinema: "Cinema Star" },
      { dayOffset: 2, time: "21:30", price: 780, format: "2D", hall: "Зал 1", cinema: "Cinema Star" },
      { dayOffset: 3, time: "23:40", price: 720, format: "2D", hall: "Зал 4", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-9",
    title: "Зверополис 2",
    genre: "Комедия, Боевик, Мультфильм, Приключения, Семейный",
    duration: "2ч",
    rating: "6+",
    poster: movie9child,
    screenings: [
      { dayOffset: 0, time: "10:20", price: 450, format: "2D", hall: "Зал 5", cinema: "Nova Cinema" },
      { dayOffset: 1, time: "13:10", price: 520, format: "2D", hall: "Зал 2", cinema: "Cinema Star" },
      { dayOffset: 2, time: "16:00", price: 590, format: "2D", hall: "Зал 1", cinema: "Nova Cinema" },
      { dayOffset: 3, time: "18:30", price: 640, format: "2D", hall: "Зал 3", cinema: "Cinema Star" },
    ],
  },
  {
    id: "movie-10",
    title: "Губка Боб: В поисках квадратных штанов",
    genre: "Комедия, Мультфильм, Приключения, Семейный, Фэнтези",
    duration: "1ч 45м",
    rating: "6+",
    poster: movie10child,
    screenings: [
      { dayOffset: 0, time: "09:40", price: 430, format: "2D", hall: "Зал 1", cinema: "Cinema Star" },
      { dayOffset: 1, time: "12:20", price: 500, format: "2D", hall: "Зал 5", cinema: "Nova Cinema" },
      { dayOffset: 2, time: "15:10", price: 570, format: "2D", hall: "Зал 3", cinema: "Cinema Star" },
      { dayOffset: 3, time: "17:20", price: 620, format: "2D", hall: "Зал 2", cinema: "Nova Cinema" },
    ],
  },
  {
    id: "movie-11",
    title: "Шрек",
    genre: "Комедия, Мультфильм, Приключения, Семейный",
    duration: "2ч 5м",
    rating: "6+",
    poster: movie11child,
    screenings: [
      { dayOffset: 0, time: "11:00", price: 480, format: "2D", hall: "Зал 2", cinema: "Nova Cinema" },
      { dayOffset: 1, time: "14:30", price: 560, format: "2D", hall: "Зал 4", cinema: "Cinema Star" },
      { dayOffset: 2, time: "17:40", price: 620, format: "2D", hall: "Зал 5", cinema: "Nova Cinema" },
      { dayOffset: 3, time: "20:10", price: 680, format: "2D", hall: "Зал 1", cinema: "Cinema Star" },
    ],
  },
  {
    id: "movie-12",
    title: "Заклятие: Обряд реинкарнации",
    genre: "Хоррор",
    duration: "1ч 45м",
    rating: "18+",
    poster: movie12,
    screenings: [
      { dayOffset: 0, time: "23:20", price: 820, format: "Dolby", hall: "VIP", cinema: "Nova Cinema" },
      { dayOffset: 1, time: "19:10", price: 680, format: "2D", hall: "Зал 1", cinema: "Cinema Star" },
      { dayOffset: 2, time: "17:00", price: 590, format: "2D", hall: "Зал 5", cinema: "Nova Cinema" },
      { dayOffset: 3, time: "22:00", price: 760, format: "2D", hall: "Зал 2", cinema: "Cinema Star" },
    ],
  },
];

const rows = 4;
const cols = 10;

export const seatsData = Array.from({ length: rows }, (_, r) =>
  Array.from({ length: cols }, (_, c) => ({
    id: `${r + 1}-${c + 1}`,
    row: r + 1,
    seat: c + 1,
  })),
);

export const emptyAdminForm = {
  dayOffset: "0",
  time: "",
  price: "",
  format: "",
  hall: "",
  cinema: "",
};
