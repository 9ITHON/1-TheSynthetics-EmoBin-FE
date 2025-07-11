import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BackendLoginData } from '../types/auth';

export interface AuthState {
  profile: any | null;
  backend: BackendLoginData | null;
  setProfile: (p: any) => void;
  setBackend: (b: BackendLoginData | null) => void;
  logout: () => Promise<void>; 
}


const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      backend: null,
      setProfile: (p) => set({ profile: p }),
      setBackend: (b) => set({ backend: b }),
      logout: async () => { 
        set({ profile: null, backend: null });
        await AsyncStorage.removeItem("auth-storage"); 
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage), 
    },
  ),
);

export {useAuthStore};