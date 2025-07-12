import api from "../utils/api";
import { RefreshResponse } from "../types/refresh";

const refreshTokenApi = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  try {
    const requestConfig = {
      url: `${process.env.BASE_URL}/auth/refresh`,
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

export { refreshTokenApi };