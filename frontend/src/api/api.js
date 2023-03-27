import axios from 'axios';

const BASE_URL =
  'http://ec2-43-200-164-30.ap-northeast-2.compute.amazonaws.com:8081/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    withCredentials: true,
  },
});

export default api;
