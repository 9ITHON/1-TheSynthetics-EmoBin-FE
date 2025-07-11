import api from "../utils/api";
import { useTokenStore } from "../stores/tokenStore";
import { MemberCheckResponse } from "../types/member_check";



const memberCheck = async (
  code: string
): Promise<MemberCheckResponse> => {
  const { data } = await api.post<MemberCheckResponse>(
    "/auth/kakao/login",
    { code },
    { headers: { "Content-Type": "application/json" } }
  );

  if (data.accessToken && data.refreshToken) {
    useTokenStore.getState().setTokens(data.accessToken, data.refreshToken);
  }

  return data;
};

export { memberCheck };