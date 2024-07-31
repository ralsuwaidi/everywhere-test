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

export const createVilla = async (villaData: any) => {
  const response = await axiosInstance.post("/villas/", villaData);
  return response.data;
};

export const getVillaBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/villas/${slug}/`);
  return response.data;
};

export const deleteRoom = async (slug: string, roomId: string) => {
  const response = await axiosInstance.delete(
    `/villas/${slug}/rooms/${roomId}/`
  );
  return response.data;
};

export const uploadVillaImages = async (slug: string, image: File) => {
  const formData = new FormData();
  formData.append("images", image);

  const response = await axiosInstance.post(
    `/villas/${slug}/upload_images/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const createVillaRoom = async (
  villaSlug: string,
  roomData: Omit<Room, "id">
) => {
  const response = await axiosInstance.post(
    `/villas/${villaSlug}/rooms/`,
    roomData
  );
  return response.data;
};
