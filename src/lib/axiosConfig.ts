// src/lib/axiosConfig.ts

import { getAuthToken } from "@/utils/auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

export default axiosInstance;
