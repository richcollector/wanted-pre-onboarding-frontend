import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE;

export const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
