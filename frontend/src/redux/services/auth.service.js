/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
// react-query(useMutation)를 사용해 HTTP요청을 처리하고 로컬 스토리지를 사용해 user information과 JWT를 처리하는 파일

// signup, login, logout

// import { useMutation } from 'react-query';
// useMutation은 POST, PUT, PATCH, DELETE 요청에 사용된다. 즉 서버사이드 데이터를 '수정'하는 경우에.

import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { onLoginSuccess } from '../../api/tokenApi';
// import Cookies from 'js-cookie';

import authHeader from './auth-header';

const register = (email, password, nickname, dogName, dogGender) => {
  const form = new FormData();
  form.append(
    'createDto',
    new Blob(
      [
        JSON.stringify({
          email,
          password,
          nickname,
          dogName,
          dogGender,
        }),
      ],
      {
        type: 'application/json',
      },
    ),
  );
  return axios.postForm(`/api/v1/members`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'ngrok-skip-browser-warning': '12',
    },
    withCredentials: true,
  });
};

// 2. login() : POST { 이메일, 비밀번호 } & JWT를 로컬스토리지에 저장

const login = (username, password) =>
  axios
    .post(
      `/api/v1/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '12',
        },
        withCredentials: true,
      },
    )
    .then(onLoginSuccess);

// 3. logout() : 로컬스토리지에서 JWT를 삭제

const logout = () => {
  // const accessToken = localStorage.getItem('user');
  axios.post(`/api/v1/auth/logout`, null, {
    headers: authHeader(),
    'ngrok-skip-browser-warning': '12',
  });
  localStorage.removeItem('accessToken');
  // Cookies.remove('Refresh');
};

// export { useRegister, useLogin, logout };
export { register, login, logout };
