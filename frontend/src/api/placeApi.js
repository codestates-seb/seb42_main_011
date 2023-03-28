import api from './api';

async function getAmenityFeeds({ amenityId, page = 1, size = 10 }) {
  return api
    .get(`/amenities/${amenityId}/bulletin-posts?page=${page}&size=${size}`)
    .then(({ data }) => data);
}

export default getAmenityFeeds;
