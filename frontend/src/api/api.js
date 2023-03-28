import axios from 'axios';

const BASE_URL =
  'https://mybuddy-loadbalancer-369953592.ap-northeast-2.elb.amazonaws.com/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    withCredentials: true,
  },
});

export default api;
