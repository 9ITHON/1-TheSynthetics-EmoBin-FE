export type Gender = 'FEMALE' | 'MALE' | null;

export interface SignupState {
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