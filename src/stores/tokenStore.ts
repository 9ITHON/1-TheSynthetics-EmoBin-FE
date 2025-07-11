import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { TokenState } from "../types/token";


const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken:  null,
      refreshToken: null,
      setTokens: (a, r) => set((state) => ({
        ...state,
        ...(a && { accessToken: a }),
        ...(r && { refreshToken: r }),
      })),
      clear:     async ()   => { 
        set({ accessToken: null, refreshToken: null });
        await SecureStore.deleteItemAsync("auth-tokens"); 
      },
    }),
    {
      name: "auth-tokens",                       
      storage: createJSONStorage(() => ({
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      })),
    }
  )
);

useTokenStore.subscribe(({ accessToken }) => {
  if (accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  else
    delete axios.defaults.headers.common.Authorization;
});

export { useTokenStore };