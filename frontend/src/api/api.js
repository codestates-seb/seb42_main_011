import axios from 'axios';

const BASE_URL = 'https://my-buddy.shop/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    withCredentials: true,
  },
});

export default api;
