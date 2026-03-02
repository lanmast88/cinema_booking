import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function getScreenings({ movieId, date } = {}) {
  const params = {};
  if (movieId) params.movie_id = movieId;
  if (date) params.date = date;
  return axios.get(`${BASE_URL}/screenings`, { params });
}

function getScreeningSeats(screeningId) {
  return axios.get(`${BASE_URL}/screenings/${screeningId}/seats`);
}

function addScreening(movie_id, hall_id, start_time, price, format) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/screenings`,
    { movie_id, hall_id, start_time, price, format },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}

export { getScreenings, getScreeningSeats, addScreening };
