import authHeader from '../redux/services/auth-header';
import api from './api';

async function updateBulletinPost({ bulletinId, postData, photoImage }) {
  const form = new FormData();

  form.append(
    'patchDto',
    new Blob([JSON.stringify(postData)], {
      type: 'application/json',
    }),
  );

  if (photoImage) {
    form.append('photoImage', photoImage);
  }
  console.log(photoImage);

  return api
    .patch(`/bulletin-posts/${bulletinId}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function deleteBulletinPost({ bulletinId }) {
  return api
    .delete(`/bulletin-posts/${bulletinId}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function createBulletinPost({ postData, photoImage }) {
  const form = new FormData();

  form.append(
    'createDto',
    new Blob([JSON.stringify(postData)], {
      type: 'application/json',
    }),
  );

  form.append('photoImage', photoImage);

  return api
    .post(`/bulletin-posts`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function getBulletinPost({ bulletinId }) {
  return api
    .get(`/bulletin-posts/${bulletinId}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function getBulletinPostList({ page = 1, size = 10 }) {
  return api
    .get(`/bulletin-posts/feed?page=${page}&size=${size}`, {
      headers: {
        ...authHeader(),
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        withCredentials: true,
      },
    })
    .then(({ data }) => data);
}

async function createBulletinPostLike({ bulletinId }) {
  return api
    .post(`/bulletin-posts/${bulletinId}/likes`, null, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function deleteBulletinPostLike({ bulletinId }) {
  return api
    .delete(`/bulletin-posts/${bulletinId}/likes`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

export {
  getBulletinPost,
  createBulletinPost,
  updateBulletinPost,
  deleteBulletinPost,
  getBulletinPostList,
  createBulletinPostLike,
  deleteBulletinPostLike,
};
