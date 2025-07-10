import axios from "axios";

export interface RefreshPayload {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken:  string;
  refreshToken: string;
}

/** refreshToken을 검증해 새 토큰을 반환하거나 401 / 403 오류를 던진다 */
export const refreshTokenApi = async (
  token: string
): Promise<RefreshResponse> => {
  const { data } = await axios.post<RefreshResponse>(
    "http://52.64.128.49:8080/api/auth/refresh",
    { refreshToken: token },
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};
