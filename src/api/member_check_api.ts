import api from "../utils/api";
import { useTokenStore } from "../stores/tokenStore";

export interface MemberCheckResponse {
  code: string;            // "OK" | "MEMBER_NOT_FOUND" …
  data: {
    nickname:      string;
    oauthId:       number;
    oauthProvider: string; // "KAKAO" …
  };
  message: string;

  /* 서버가 동시에 토큰을 내려줄 수 있으므로 optional */
  accessToken?:  string;
  refreshToken?: string;
}

/** 카카오 accessToken을 백엔드에 보내 회원 여부를 확인한다. */
export const memberCheck = async (
  accessToken: string
): Promise<MemberCheckResponse> => {
  const { data } = await api.post<MemberCheckResponse>(
    "/auth/kakao/login",
    { accessToken },
    { headers: { "Content-Type": "application/json" } }
  );

  /* 응답에 새 토큰이 포함돼 있으면 저장 */
  if (data.accessToken && data.refreshToken) {
    useTokenStore.getState().setTokens(data.accessToken, data.refreshToken);
  }

  return data;
};
