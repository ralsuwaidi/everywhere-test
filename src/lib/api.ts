// src/utils/api.ts
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosConfig";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth-token/", {
      username,
      password,
    });

    // Save the token in cookies
    Cookies.set("auth-token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
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

export const getRooms = async (slug: string) => {
  const response = await axiosInstance.get(`/villas/${slug}/rooms/`);
  return response.data;
};

export const getPricing = async (slug: string) => {
  const response = await axiosInstance.get(`/villas/${slug}/base-price/`);
  return response.data;
};

export const patchPricing = async (slug: string, pricing: number[]) => {
  const response = await axiosInstance.patch(`/villas/${slug}/base-price/`, {
    prices: pricing,
  });
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

export const createRoom = async (
  villaSlug: string,
  roomData: Omit<Room, "id">
) => {
  const response = await axiosInstance.post(
    `/villas/${villaSlug}/rooms/`,
    roomData
  );
  return response.data;
};

export const getRoom = async (slug: string, roomId: string) => {
  const response = await axiosInstance.get(`/villas/${slug}/rooms/${roomId}/`);
  return response.data;
};

export const patchRoom = async (
  slug: string,
  roomId: string,
  roomData: Partial<Omit<Room, "id">>
) => {
  const response = await axiosInstance.patch(
    `/villas/${slug}/rooms/${roomId}/`,
    roomData
  );
  return response.data;
};

export const getDeals = async (slug: string) => {
  const response = await axiosInstance.get(`/villas/${slug}/deals/`);
  return response.data;
};

export const deleteDeal = async (slug: string, dealId: string) => {
  await axiosInstance.delete(`/villas/${slug}/deals/${dealId}/`);
};

export const createDeal = (slug: string, dealData: Omit<Deal, "id">) => {
  return axiosInstance
    .post(`/villas/${slug}/deals/`, dealData)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // Return detailed error information
        return Promise.reject(error.response.data);
      } else if (error.request) {
        // Handle request errors
        return Promise.reject({ message: "No response from server" });
      } else {
        // Handle general errors
        return Promise.reject({ message: error.message });
      }
    });
};

export const getDeal = async (slug: string, dealId: string) => {
  const response = await axiosInstance.get(`/villas/${slug}/deals/${dealId}/`);
  return response.data;
};

export const updateDeal = async (
  slug: string,
  dealId: string,
  dealData: Omit<Deal, "id">
) => {
  const response = await axiosInstance.patch(
    `/villas/${slug}/deals/${dealId}/`,
    dealData
  );
  return response.data;
};
