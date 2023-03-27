import api from './api';

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
