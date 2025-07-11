import api from "../utils/api";          
import { useTokenStore } from "../stores/tokenStore";

export interface SignUpPayload {
  oauthId: number;
  oauthProvider: string;
  nickname: string;
  birthdate: string;
  gender: "MALE" | "FEMALE";
}

export interface SignUpResponse {
  accessToken:  string;
  refreshToken: string;
  memberId:     number;   
}

export const signUp = async (
  payload: SignUpPayload
): Promise<SignUpResponse> => {
  const { data } = await api.post<SignUpResponse>(
    "/auth/signup",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  useTokenStore.getState().setTokens(data.accessToken, data.refreshToken);
  return data;
};
