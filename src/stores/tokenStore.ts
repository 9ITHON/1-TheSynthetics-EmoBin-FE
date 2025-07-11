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
  clear: () => Promise<void>; 
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken:  null,
      refreshToken: null,
      setTokens: (a, r) => set({ accessToken: a, refreshToken: r }),
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
