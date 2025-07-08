import { create } from 'zustand';

type Gender = 'FEMALE' | 'MALE' | null;

interface SignupState {
  nickname: string;
  gender: Gender;
  year: number | '';
  month: number | '';
  day: number | '';
  // actions
  setNickname: (v: string) => void;
  setGender: (v: Gender) => void;
  setYear:    (v: number | '') => void;
  setMonth:   (v: number | '') => void;
  setDay:     (v: number | '') => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  nickname: '',
  gender: null,
  year: '',
  month: '',
  day: '',
  setNickname: (v) => set({ nickname: v }),
  setGender:   (v) => set({ gender: v }),
  setYear:     (v) => set({ year: v }),
  setMonth:    (v) => set({ month: v }),
  setDay:      (v) => set({ day: v }),
  reset: () =>
    set({ nickname: '', gender: null, year: '', month: '', day: '' }),
}));
