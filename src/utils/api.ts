import axios from "axios";
import { refreshTokenApi } from "../api/refresh_token_api";
import { resetToLogin }    from "../navigation/RootNavigation";
import { useTokenStore }   from "../stores/tokenStore";
import { useAuthStore }    from "../stores/authStore";

const api = axios.create({
  baseURL: "http://52.64.128.49:8080",
  timeout: 10_000,
});

/* 요청마다 accessToken 주입 */
api.interceptors.request.use((config) => {
  if (config._isRefreshRequest) {
    return config;
  }

  const { accessToken } = useTokenStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/* 401/403 → refresh 재발급 */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("API Interceptor Error Handler entered:", error);
    const original = error.config;
    if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 500) {
      if (!original._retry && !original._isRefreshRequest) {
        original._retry = true;

        try {
          const { refreshToken, setTokens, clear } = useTokenStore.getState();
          if (!refreshToken) throw new Error("No refreshToken");

          const fresh = await refreshTokenApi(refreshToken);
          setTokens(fresh.accessToken, fresh.refreshToken);

          original.headers.Authorization = `Bearer ${fresh.accessToken}`;
          return api(original);                            
        } catch (err) {
          console.log("Refresh token failed, redirecting to login:", err);
          await useTokenStore.getState().clear();
          await useAuthStore.getState().logout();
          resetToLogin();
          return Promise.reject(err);
        }
      } else {
        console.log("Authentication failed, redirecting to login:", error);
        await useTokenStore.getState().clear();
        await useAuthStore.getState().logout();
        resetToLogin();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
