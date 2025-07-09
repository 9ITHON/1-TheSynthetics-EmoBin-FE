import axios from "axios";

export interface SignUpPayload {
  oauthId: number;
  oauthProvider: string; // "KAKAO" 등
  nickname: string;
  birthdate: string;     // "YYYY-MM-DD"
  gender: "MALE" | "FEMALE";
}

export const signUp = async (payload: SignUpPayload) => {
  const { data } = await axios.post(
    "http://52.64.128.49:8080/auth/signup",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};
