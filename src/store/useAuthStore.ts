// src/store/useAuthStore.ts

import { create } from "zustand";
import { loginUser, getCurrentUser } from "@/utils/api";

interface AuthState {
  user: { name: string; url: string; email: string } | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(username, password);
      document.cookie = `auth-token=${
        data.token
      }; path=/; secure; samesite=strict; max-age=${7 * 24 * 60 * 60}`;
      console.log(data);
      await get().fetchCurrentUser();
    } catch (error) {
      set({ error: "Login failed", loading: false });
    }
  },

  logout: () => {
    document.cookie = "auth-token=; path=/; max-age=0; secure; samesite=strict";
    set({ user: null });
  },

  fetchCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getCurrentUser();
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch user", loading: false });
    }
  },
}));

export default useAuthStore;
