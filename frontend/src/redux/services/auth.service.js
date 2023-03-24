/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
// react-query(useMutation)를 사용해 HTTP요청을 처리하고 로컬 스토리지를 사용해 user information과 JWT를 처리하는 파일

// signup, login, logout

// import { useMutation } from 'react-query'; 
// useMutation은 POST, PUT, PATCH, DELETE 요청에 사용된다. 즉 서버사이드 데이터를 '수정'하는 경우에.

import axios from "axios";
import Cookies from 'js-cookie';
import authHeader from "./auth-header";
import config from "../../config";

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
  return axios.postForm(`${config.BASE_URL}/members`, form, {
    header: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
};

// 2. login() : POST { 이메일, 비밀번호 } & JWT를 로컬스토리지에 저장
const login = (email, password) => 
   axios
    .post(`${config.BASE_URL}/auth/login`, {
      email,
      password,
    })
    .then((response) => {

      localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken)); 
      Cookies.set("refreshToken", response.data.refreshToken);
      // TODO: user info를 user state에 저장하는 코드 작성

      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })

// 3. logout() : 로컬스토리지에서 JWT를 삭제
const logout = () => {
  // const accessToken = localStorage.getItem('user');
  axios.post(`${config.BASE_URL}/auth/logout`, null, { headers: authHeader() })
  localStorage.removeItem('accessToken');
  Cookies.remove('refreshToken');
}

// export { useRegister, useLogin, logout };
export { register, login, logout };