import axios from "axios";

export interface RefreshPayload {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken:  string;
  refreshToken: string;
}

export const refreshTokenApi = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  const { data } = await axios.post<RefreshResponse>(
    "http://52.64.128.49:8080/api/auth/refresh",
    { refreshToken },
    { headers: { "Content-Type": "application/json" } }
  );
  return data;           // 저장·네비게이션은 호출자가 처리
};
