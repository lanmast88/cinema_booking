import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function getMovies() {
    return axios.get(`${BASE_URL}/movies`);
}

function getMovie(id) {
    return axios.get(`${BASE_URL}/movies/${id}`);
}

export { getMovies, getMovie };