/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
// react-query(useMutation)를 사용해 HTTP요청을 처리하고 로컬 스토리지를 사용해 user information과 JWT를 처리하는 파일

// signup, login, logout

// import { useMutation } from 'react-query';
// useMutation은 POST, PUT, PATCH, DELETE 요청에 사용된다. 즉 서버사이드 데이터를 '수정'하는 경우에.

import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
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
        },
        withCredentials: true,
      },
    )
    .then(onLoginSuccess);
// 로그인 만료(액세스 토큰 기한 만료) & 페이지 새로고침시
// refresh토큰으로 액세스토큰 다시 발급

const JWT_EXPIRY_TIME = 2 * 60 * 1000;
// 2-1. onSilentRefresh() : /refresh로 POST 요청 -> onLoginSuccess 실행

const onSilentRefresh = () => {
  axios
    .post(`/api/v1/auth/refresh`, null, {
      headers: authHeader(),
      withCredentials: true,
    })
    .then(onLoginSuccess)
    .catch(error => {
      console.log(error);
    });
};
// 2-2. onLoginSuccess(response)
// 로그인 성공시 액세스토큰을 로컬스토리지에 저장
// 액세스토큰 만료시간 1분 전에 로그인을 연장
const onLoginSuccess = response => {
  setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000); // 만료 1분 전 refresh함수 실행
  const accessToken = JSON.stringify(
    response.headers.authorization.split(' ')[1],
  );
  localStorage.setItem('accessToken', accessToken);
  try {
    const user = jwtDecode(accessToken);
    return user.memberId;
  } catch (error) {
    console.log(error);
  }
};

// 3. logout() : 로컬스토리지에서 JWT를 삭제
const logout = () => {
  // const accessToken = localStorage.getItem('user');
  axios.post(`/api/v1/auth/logout`, null, { headers: authHeader() });
  localStorage.removeItem('accessToken');
  Cookies.remove('refreshToken');
};

// export { useRegister, useLogin, logout };
export { register, login, logout, onLoginSuccess, onSilentRefresh };
