import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function getCinemas() {
    return axios.get(`${BASE_URL}/cinemas`);
}

function getCinemaHalls(cinemaId) {
    return axios.get(`${BASE_URL}/cinemas/${cinemaId}/halls`);
}

export { getCinemas, getCinemaHalls };