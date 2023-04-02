import api from './api';

async function searchDefault({ page, size }) {
  return api
    .get(`/search/newest-members`, {
      params: {
        page,
        size,
      },
    })
    .then(response => response.data);
}

export default searchDefault;
