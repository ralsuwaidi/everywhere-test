// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, getCurrentUser } from "@/lib/api";

interface User {
  name: string;
  url: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  fetchCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      token: null,

      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;

        return true;
      },

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const data = await loginUser(email, password);
          set({ token: data.token, loading: false });
          await get().fetchCurrentUser();
        } catch (error) {
          set({ error: "Login failed", loading: false });
          throw error; // Re-throw the error so the component can handle it
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      fetchCurrentUser: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getCurrentUser();
          set({ user: data, loading: false });
        } catch (error) {
          set({
            error: "Failed to fetch user",
            loading: false,
            user: null,
            token: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
