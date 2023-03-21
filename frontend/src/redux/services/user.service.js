// 서버 데이터에 접근(GET)하기 위한 서비스를 정의한 파일

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import authHeader from "./auth-header"; // 이 함수로 HTTP헤더를 추가한다. 

const API_URL = "http://localhost:8080/api/v1/";

// const get

const getPublicContent = () => axios.get(`${API_URL}all`);

const getUserBoard = () => axios.get(`${API_URL}user`, { headers: authHeader() });

const getModeratorBoard = () => axios.get(`${API_URL}mod`, { headers: authHeader() });

const getAdminBoard = () => axios.get(`${API_URL}admin`, { headers: authHeader() });

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};