import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (p) => set({ profile: p }),
      logout: () => set({ profile: null }),
    }),
    {
      name: "auth",
    }
  )
);
