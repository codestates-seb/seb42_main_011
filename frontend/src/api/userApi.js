import api from './api';
import authHeader from '../redux/services/auth-header';

async function getUserProfile({ memberId, userData }) {
  return api.get(`/members/${memberId}`, userData).then(({ data }) => data);
}

async function updateUser({ memberId, nickname, aboutMe, profileImage }) {
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
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function deleteUser({ memberId }) {
  return api
    .delete(`/members/${memberId}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function getUserFollower({ page = 1, size = 10 }) {
  return api
    .get(`/followers/follower?page=${page}&size=${size}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function getUserFollowing({ page = 1, size = 10 }) {
  return api
    .get(`/followers/followee?page=${page}&size=${size}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function postUserFollow({ memberId, userData }) {
  return api
    .post(`/followers?followeeId=${memberId}`, userData, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function deleteUserFollow({ memberId }) {
  return api
    .delete(`/followers?followeeId=${memberId}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

async function getUserInfo({ memberId }) {
  return api
    .get(`/members/${memberId}/info`, {
      headers: {
        ...authHeader(),
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
  deleteUser,
  getUserInfo,
};
