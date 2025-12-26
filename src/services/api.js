import axios from "axios";

const API = axios.create({
  baseURL: "https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendorToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
