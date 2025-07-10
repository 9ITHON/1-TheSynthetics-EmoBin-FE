import api from "../utils/api";            // ✅ 공통 Axios 인스턴스
import { useTokenStore } from "../stores/tokenStore";

export interface SignUpPayload {
  oauthId: number;
  oauthProvider: string;      // "KAKAO" …
  nickname: string;
  birthdate: string;          // "YYYY-MM-DD"
  gender: "MALE" | "FEMALE";
}

export interface SignUpResponse {
  accessToken:  string;
  refreshToken: string;
  memberId:     number;       // 서버 스펙에 맞게 필드 추가
}

/** 첫 회원가입(소셜 로그인 이후 정보 입력) */
export const signUp = async (
  payload: SignUpPayload
): Promise<SignUpResponse> => {
  const { data } = await api.post<SignUpResponse>(
    "/auth/signup",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  /* 서버가 내려준 토큰을 전역 스토어 + SecureStore 에 저장 */
  useTokenStore.getState().setTokens(data.accessToken, data.refreshToken);
  return data;
};
