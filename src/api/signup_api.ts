import api from "../utils/api";          
import { useTokenStore } from "../stores/tokenStore";
import { SignUpPayload } from "../types/signup";
import { SignUpResponse } from "../types/signup";

const signUp = async (
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

export { signUp };