import api from './api';

async function getAmenity({ amenityId }) {
  return api.get(`/amenities/${amenityId}`, {}).then(({ data }) => data);
}

export default getAmenity;
