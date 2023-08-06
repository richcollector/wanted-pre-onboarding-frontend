/*
  API를 위한 기본 세팅 
*/

import axios from "axios";

// API 공통 URL 값 불러오기
const API_URL = process.env.REACT_APP_API_BASE;

// API 공통 Header 세팅
export const config = {
  headers: {
    "Content-type": "application/json",
  },
};

// API 공통 URL 값 세팅
const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
