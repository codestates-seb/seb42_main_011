/* eslint-disable consistent-return */
// react-query(useMutation)를 사용해 HTTP요청을 처리하고 로컬 스토리지를 사용해 user information과 JWT를 처리하는 파일

// signup, login, logout

// import { useMutation } from 'react-query'; 
// useMutation은 POST, PUT, PATCH, DELETE 요청에 사용된다. 즉 서버사이드 데이터를 '수정'하는 경우에.

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/";
// const API_URL = "/";

// 1. register() : POST { 이메일, 비밀번호, 닉네임, 강아지이름, 강아지성별 }
const register = (email, password, nickname, dogName, dogGender) => 
   axios
  .post(`${API_URL}members`, {
      email,
      password,
      nickname,
      dogName,
      dogGender,
    })
  // const response = await fetch(`${API_URL}members`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password, nickname, dogName, dogGender}),
  // });
  // const data = await response.json();
  // if(!response.ok){
  //   throw new Error(data.message || '에러 메시지');
  // }
  // return data;
;

// msw용
// async function register()

// 2. login() : POST { 이메일, 비밀번호 } & JWT를 로컬스토리지에 저장
const login = (email, password) => 
   axios
    .post(`${API_URL}auth/login`, {
      email,
      password,
    })
    .then((response) => {
      if(response.data.accessToken){
        // user를 accesstoken으로 바꾸기
        localStorage.setItem("user", JSON.stringify(response.data)); 

        // Secure: HTTPS연결만 허용, HttpOnly: client-side 스크립트가 쿠키에 접근하는 것을 방지
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; Secure; HttpOnly; SameSite=Strict; max-age=${30 * 24 * 60 * 60}`;
      }

      return response.data;
    })


// 3. logout() : 로컬스토리지에서 JWT를 삭제
// const logout = () => {
//   const accessToken = localStorage.getItem('user');
//   axios.post(`${API_URL}auth/logout`, { headers: authHeader() })
//   localStorage.removeItem('accessToken');
//   document.cookie = 'refreshToken=; path=/; Secure; HttpOnly; SameSite=Strict;';
// }

// export { useRegister, useLogin, logout };
export { register, login, logout };