import api from "../utils/api";
import { useTokenStore } from "../stores/tokenStore";

export interface MemberCheckResponse {
  code: string;          
  data: {
    nickname:      string;
    oauthId:       number;
    oauthProvider: string;
  };
  message: string;

  accessToken?:  string;
  refreshToken?: string;
}

export const memberCheck = async (
  accessToken: string
): Promise<MemberCheckResponse> => {
  const { data } = await api.post<MemberCheckResponse>(
    "/auth/kakao/login",
    { accessToken },
    { headers: { "Content-Type": "application/json" } }
  );

  if (data.accessToken && data.refreshToken) {
    useTokenStore.getState().setTokens(data.accessToken, data.refreshToken);
  }

  return data;
};
