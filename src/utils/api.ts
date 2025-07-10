import axios from "axios";
import { refreshTokenApi } from "../api/refresh_token_api";
import { resetToLogin }    from "../navigation/RootNavigation";
import { useTokenStore }   from "../stores/tokenStore";
import { useAuthStore }    from "../stores/authStore"; // 이 줄을 추가합니다.

const api = axios.create({
  baseURL: "http://52.64.128.49:8080",
  timeout: 10_000,
});

/* 요청마다 accessToken 주입 */
api.interceptors.request.use((config) => {
  // _isRefreshRequest 플래그가 true인 경우 Authorization 헤더를 추가하지 않음
  if (config._isRefreshRequest) {
    console.log("Skipping Authorization header for refresh token request.");
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
    console.log("API Interceptor Error Handler entered:", error); // 이 줄을 추가합니다.
    const original = error.config;
    if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 500) {
      // 재시도 플래그가 없고, 리프레시 요청이 아닌 경우에만 토큰 재발급 시도
      if (!original._retry && !original._isRefreshRequest) {
        original._retry = true;

        try {
          const { refreshToken, setTokens, clear } = useTokenStore.getState();
          if (!refreshToken) throw new Error("No refreshToken");

          const fresh = await refreshTokenApi(refreshToken);
          setTokens(fresh.accessToken, fresh.refreshToken);   // SecureStore + 헤더 동기화

          original.headers.Authorization = `Bearer ${fresh.accessToken}`;
          return api(original);                               // 원 요청 재시도
        } catch (err) {
          // refreshTokenApi 호출 자체가 실패한 경우 (예: 403)
          console.log("Refresh token failed, redirecting to login:", err);
          console.log("Attempting to clear token store...");
          await useTokenStore.getState().clear();
          console.log("Token store cleared. Attempting to clear auth store...");
          await useAuthStore.getState().logout();
          console.log("Auth store cleared. Navigating to login screen...");
          resetToLogin();
          return Promise.reject(err);
        }
      } else {
        // 이미 재시도했거나, 리프레시 요청 자체가 401/403을 받은 경우
        // 이 경우에도 토큰을 삭제하고 로그인 화면으로 리다이렉트
        console.log("Authentication failed, redirecting to login:", error);
        console.log("Attempting to clear token store...");
        await useTokenStore.getState().clear();
        console.log("Token store cleared. Attempting to clear auth store...");
        await useAuthStore.getState().logout();
        console.log("Auth store cleared. Navigating to login screen...");
        resetToLogin();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
