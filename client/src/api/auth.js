import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

function register(email, password) {
    return axios.post(`${BASE_URL}/auth/register`, { email, password });
}

function login(email, password) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    return axios.post(`${BASE_URL}/auth/login`, formData);
}

function getMe(token) {
    return axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export { register, login, getMe };