import axios from "axios";

const normalizeBaseUrl = (value, fallback) =>
  (value || fallback).trim().replace(/\/+$/, "");

const API_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_URL,
  "http://localhost:3002"
);

export const FRONTEND_URL = normalizeBaseUrl(
  process.env.REACT_APP_FRONTEND_URL,
  "http://localhost:3000"
);

if (axios && axios.defaults) {
  axios.defaults.timeout = 15000;
}

export default API_URL;
