// src/stores/authStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface BackendUserData {
  oauthId: number;
  oauthProvider: 'KAKAO' | 'APPLE' | string;
  nickname?: string;
}

export interface BackendLoginData {
  code: string;
  data: BackendUserData;
  message: string;
}

export interface AuthState {
  profile: any | null;
  backend: BackendLoginData | null;
  setProfile: (p: any) => void;
  setBackend: (b: BackendLoginData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      backend: null,
      setProfile: (p) => set({ profile: p }),
      setBackend: (b) => set({ backend: b }),
      logout: () => set({ profile: null, backend: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage), // 핵심
    },
  ),
);
