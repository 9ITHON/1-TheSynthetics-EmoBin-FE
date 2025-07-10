import api from "../utils/api";

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
  console.log("Sending refreshToken:", refreshToken);
  try {
    const requestConfig = {
      url: "http://52.64.128.49:8080/api/auth/refresh",
      method: "POST",
      data: { refreshToken },
      headers: { "Content-Type": "application/json" },
      _isRefreshRequest: true
    };
    console.log("refreshTokenApi request config:", requestConfig); // 이 줄을 추가합니다。

    const { data } = await api.post<RefreshResponse>(
      requestConfig.url,
      requestConfig.data,
      { headers: requestConfig.headers, _isRefreshRequest: requestConfig._isRefreshRequest }
    );
    console.log("refreshTokenApi success, data:", data);
    return data;
  } catch (error) {
    console.error("refreshTokenApi failed:", error);
    throw error; // 에러를 다시 던져서 호출자(api.ts 인터셉터)가 잡을 수 있도록 함
  }
};
