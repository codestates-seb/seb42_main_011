import axios from 'axios';

const BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
});

async function updateBulletinPost({ bulletinId, postData }) {
  return api
    .patchForm(`/bulletin-posts/${bulletinId}`, postData, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    .then(({ data }) => data);
}

async function createBulletinPost({ postData }) {
  return api.axios
    .postForm(`/bulletin-posts`, postData, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    .then(({ data }) => data);
}

async function getBulletinPost({ bulletinId }) {
  return api
    .get(`/bulletin-posts/${bulletinId}`, {
      header: { 'ngrok-skip-browser-warning': '12' },
    })
    .then(({ data }) => data);
}

async function getBulletinPostList({ page = 1, size = 10 }) {
  return api
    .get(`/bulletin-posts/feed?page=${page}&size=${size}`)
    .then(({ data }) => data);
}

export {
  updateBulletinPost,
  createBulletinPost,
  getBulletinPost,
  getBulletinPostList,
};
