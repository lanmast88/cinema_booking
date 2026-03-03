import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function getCinemas() {
    return axios.get(`${BASE_URL}/cinemas`);
}

function getCinemaHalls(cinemaId) {
    return axios.get(`${BASE_URL}/cinemas/${cinemaId}/halls`);
}

function getHallsByCinemaIds(cinemaIds = []) {
    const params = new URLSearchParams();
    cinemaIds.forEach((id) => params.append("cinema_ids", String(id)));
    return axios.get(`${BASE_URL}/cinemas/halls/by-cinema?${params.toString()}`);
}

export { getCinemas, getCinemaHalls, getHallsByCinemaIds };
