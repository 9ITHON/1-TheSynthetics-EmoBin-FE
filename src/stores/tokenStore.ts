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
  clear: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken:  null,
      refreshToken: null,
      setTokens: (a, r) => set({ accessToken: a, refreshToken: r }),
      clear:     ()   => set({ accessToken: null, refreshToken: null }),
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
