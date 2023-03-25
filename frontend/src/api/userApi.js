import axios from 'axios';

const BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': '12',
  },
});

async function getUserProfile({ memberId, userData }) {
  return api.get(`/members/${memberId}`, userData).then(({ data }) => data);
}

async function updateUser({
  memberId,
  nickname,
  aboutMe,
  profileImage,
  accessToken,
}) {
  const form = new FormData();

  form.append(
    'updateDto',
    new Blob([JSON.stringify({ nickname, aboutMe })], {
      type: 'application/json',
    }),
  );
  form.append('profileImage', profileImage);

  return api
    .post(`/members/${memberId}`, form, {
      headers: {
        'Content-Type': `multipart/form-data`,
        authorization: accessToken,
      },
    })
    .then(({ data }) => data);
}

async function getUserFollower({ page = 1, size = 10, accessToken }) {
  return api
    .get(`/followers/follower?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => data);
}

async function getUserFollowing({ page = 1, size = 10, accessToken }) {
  return api
    .get(`/followers/followee?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => data);
}

async function postUserFollow({ memberId, userData, accessToken }) {
  return api
    .post(`/followers?followeeId=${memberId}`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => data);
}

async function deleteUserFollow({ memberId, accessToken }) {
  return api
    .delete(`/followers?followeeId=${memberId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => data);
}

export {
  getUserProfile,
  getUserFollower,
  getUserFollowing,
  updateUser,
  postUserFollow,
  deleteUserFollow,
};
