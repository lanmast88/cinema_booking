import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function getMovies() {
  return axios.get(`${BASE_URL}/movies`);
}

function getMovie(id) {
  return axios.get(`${BASE_URL}/movies/${id}`);
}

function addMovie(name, description, duration_min, poster_url, age_rating) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/movies`,
    {
      name,
      description,
      duration_min,
      poster_url,
      age_rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export { getMovies, getMovie, addMovie };
