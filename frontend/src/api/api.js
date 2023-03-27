import axios from 'axios';

const BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': '12',
    withCredentials: true,
  },
});

export default api;
