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
      url: "http://52.64.128.49:8080/auth/refresh",
      method: "POST",
      data: { refreshToken },
      headers: { "Content-Type": "application/json" },
      _isRefreshRequest: true
    };

    const { data } = await api.post<RefreshResponse>(
      requestConfig.url,
      requestConfig.data,
      { headers: requestConfig.headers, _isRefreshRequest: requestConfig._isRefreshRequest }
    );
    return data;
  } catch (error) {
    console.log("refreshTokenApi failed:", error);
    throw error; 
  }
};
