// src/utils/api.ts

import axiosInstance from "@/lib/axiosConfig";

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post("/auth-token/", {
    username,
    password,
  });
  return response.data;
};

export const getVillas = async () => {
  const response = await axiosInstance.get("/villas/");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me/");
  return response.data;
};
