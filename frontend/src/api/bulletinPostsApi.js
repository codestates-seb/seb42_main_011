import axios from 'axios';

const BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': '12',
  },
});

async function updateBulletinPost({ bulletinId, postData }) {
  return api
    .patchForm(`/bulletin-posts/${bulletinId}`, postData, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    .then(({ data }) => data);
}

async function createBulletinPost({ postData, photoImage, accessToken }) {
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
        authorization: accessToken,
      },
    })
    .then(({ data }) => data);
}

async function getBulletinPost({ bulletinId }) {
  return api.get(`/bulletin-posts/${bulletinId}`).then(({ data }) => data);
}

async function getBulletinPostList({ page = 1, size = 10 }) {
  return api
    .get(`/bulletin-posts/feed?page=${page}&size=${size}`)
    .then(({ data }) => data);
}

const login = (username, password) =>
  api
    .post(
      `/api/v1/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(response => {
      // localStorage.setItem("accessToken", JSON.stringify(response.data.));
      // Cookies.set("refreshToken", response.data.refreshToken);
      localStorage.setItem('tokens', JSON.stringify(response.data));
      // TODO: user info를 user state에 저장하는 코드 작성

      return response.data;
    })
    .catch(error => {
      console.log(error);
    });

export {
  updateBulletinPost,
  createBulletinPost,
  getBulletinPost,
  getBulletinPostList,
  login,
};
