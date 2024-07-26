// src/utils/auth.ts

import Cookies from "js-cookie";

export const saveAuthToken = (token: string) => {
  Cookies.set("auth-token", token, {
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get("auth-token");
};

export const clearAuthToken = () => {
  Cookies.remove("auth-token");
};
