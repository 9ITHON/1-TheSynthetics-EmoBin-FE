// src/stores/authStore.ts
// zustand + persist 로 간단한 인증 상태 관리

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ────────────────────────────────────────────────────────────────
// KakaoProfile 타입 (API helper 와 동일한 구조)
// ────────────────────────────────────────────────────────────────

export interface KakaoProfile {
  id: string; // Kakao user id (문자열)
  profile: {
    nickname: string;
    profile_image_url?: string;
    thumbnail_image_url?: string;
  };
  email?: string;
}

// ────────────────────────────────────────────────────────────────
// Zustand 상태 정의
// ────────────────────────────────────────────────────────────────

interface AuthState {
  profile: KakaoProfile | null;
  setProfile: (p: KakaoProfile) => void;
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
      name: "auth", // AsyncStorage key
      // storage: createJSONStorage(() => SecureStore) ← Expo SecureStore 사용 시
    }
  )
);
