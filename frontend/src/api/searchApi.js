import axios from 'axios';

const BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
    'ngrok-skip-browser-warning': '12',
  },
});

async function searchFriends({ page, size, type, name }) {
  return api
    .get(`/search`, {
      params: {
        page,
        size,
        type,
        name,
      },
    })
    .then(({ data }) => data);
}

export default searchFriends;
