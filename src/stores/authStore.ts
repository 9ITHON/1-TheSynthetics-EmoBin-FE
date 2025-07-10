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
  setBackend: (b: BackendLoginData | null) => void;
  logout: () => Promise<void>; // Promise를 반환하도록 변경
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      backend: null,
      setProfile: (p) => set({ profile: p }),
      setBackend: (b) => set({ backend: b }),
      logout: async () => { // async로 변경
        set({ profile: null, backend: null });
        console.log("[AuthStore] Memory state set to null. Current state:", useAuthStore.getState());
        await AsyncStorage.removeItem("auth-storage"); // await 추가
        console.log("[AuthStore] AsyncStorage 'auth-storage' deleted.");
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage), // 핵심
    },
  ),
);
