// src/stores/tokenStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

type Tokens = {
  accessToken:  string | null;
  refreshToken: string | null;
};

interface TokenState extends Tokens {
  setTokens:  (a: string, r: string) => void;
  clear: () => Promise<void>; // Promise를 반환하도록 변경
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken:  null,
      refreshToken: null,
      setTokens: (a, r) => set({ accessToken: a, refreshToken: r }),
      clear:     async ()   => { // async로 변경
        set({ accessToken: null, refreshToken: null });
        console.log("[TokenStore] Memory state set to null. Current state:", useTokenStore.getState());
        await SecureStore.deleteItemAsync("auth-tokens"); // SecureStore에서도 삭제
        console.log("[TokenStore] SecureStore 'auth-tokens' deleted.");
      },
    }),
    {
      name: "auth-tokens",                         // SecureStore key
      storage: createJSONStorage(() => ({
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      })),
    }
  )
);

/* 🔄 토큰 값이 바뀔 때마다 axios 기본 헤더 동기화 */
useTokenStore.subscribe(({ accessToken }) => {
  if (accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  else
    delete axios.defaults.headers.common.Authorization;
});
