// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Profile {
  id: number;
  kakao_account: {
    profile: { nickname: string };
    // 필요하면 email 등 추가
  };
  // ...
}

interface AuthState {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (p) => set({ profile: p }),
      logout: () => set({ profile: null }),
    }),
    {
      name: 'auth',           // AsyncStorage key
      // storage: createJSONStorage(() => SecureStore)  ← Expo SecureStore 쓰고 싶으면
    }
  )
);
