/* eslint-disable import/no-extraneous-dependencies */
// 위 오류는 왜 생기는 걸까요...?
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

// 이메일, 닉네임 중복확인
const emailVerify = input => {
  const params = { email: input };
  axios.get(`${API_URL}members/verify`, {params});
}

const nicknameVerify = input => {
  const params = { nickname: input };
  axios.get(`${API_URL}members/verify`, {params});
}

export { emailVerify, nicknameVerify };