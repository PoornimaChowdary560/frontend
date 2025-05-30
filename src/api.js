// frontend/src/api.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: baseURL,
});

export default API;
