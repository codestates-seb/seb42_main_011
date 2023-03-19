// 서버 데이터에 접근(GET)하기 위한 서비스를 정의한 파일

import { useQuery } from "react-query";
import authHeader from "./auth-header"; // 이 함수로 HTTP헤더를 추가한다. 

const API_URL = "http://localhost:8080/api/v1/";

async function getPublicContent() {
  const response = await fetch(`${API_URL}all`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '에러 메시지');
  }
  return data;
};

async function getUserBoard() {
  const response = await fetch(`${API_URL}user`, {
    headers: authHeader() 
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '에러 메시지');
  }
  return data;
};

async function getModeratorBoard() {
  const response = await fetch(`${API_URL}mod`, {
    headers: authHeader() 
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '에러 메시지');
  }
  return data;
};

async function getAdminBoard() {
  const response = await fetch(`${API_URL}admin`, {
    headers: authHeader() 
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '에러 메시지');
  }
  return data;
};

const usePublicContent = () => useQuery('publicContent', getPublicContent);

const useUserBoard = () => useQuery('userBoard', getUserBoard);

const useModeratorBoard = () => useQuery('moderatorBoard', getModeratorBoard);

const useAdminBoard = () => useQuery('adminBoard', getAdminBoard);

export { usePublicContent, useUserBoard, useModeratorBoard, useAdminBoard };