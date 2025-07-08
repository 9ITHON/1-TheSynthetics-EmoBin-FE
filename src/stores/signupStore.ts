import { create } from 'zustand';
import { SignupState } from '../types/signup';

const useSignupStore = create<SignupState>((set) => ({
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

export { useSignupStore }; 