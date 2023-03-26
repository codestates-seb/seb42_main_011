import authHeader from '../redux/services/auth-header';
import api from './api';

async function createComments({ commentContent, bulletinPostId }) {
  return api
    .post(
      `/comments`,
      { commentContent, bulletinPostId },
      {
        headers: {
          ...authHeader(),
        },
      },
    )
    .then(({ data }) => data);
}

async function updateComments({ commentContent, bulletinPostId }) {
  return api
    .patch(
      `/comments`,
      { commentContent, bulletinPostId },
      {
        headers: {
          ...authHeader(),
        },
      },
    )
    .then(({ data }) => data);
}

async function deleteComments({ commentContent, bulletinPostId }) {
  return api
    .delete(
      `/comments`,
      { commentContent, bulletinPostId },
      {
        headers: {
          ...authHeader(),
        },
      },
    )
    .then(({ data }) => data);
}

const login = (username, password) =>
  api
    .post(
      `/auth/login`,
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

export { createComments, updateComments, deleteComments, login };
