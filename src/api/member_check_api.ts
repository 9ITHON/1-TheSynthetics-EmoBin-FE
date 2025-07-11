import api from "../utils/api";
import { useTokenStore } from "../stores/tokenStore";
import { MemberCheckResponse } from "../types/member_check";

/**
 * 카카오 OAuth code를 받아 백엔드에 회원 검사/로그인 요청
 */
export const memberCheck = async (
  code: string
): Promise<MemberCheckResponse> => {
  const { data } = await api.post<MemberCheckResponse>(
    "/auth/kakao/login",
    { code },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  // 액세스·리프레시 토큰 전역 저장
  if (data.accessToken && data.refreshToken) {
    useTokenStore.getState().setTokens(data.accessToken, data.refreshToken);
  }

  return data;
};
