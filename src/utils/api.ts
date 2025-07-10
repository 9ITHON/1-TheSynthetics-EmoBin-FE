import axios from "axios";
import { refreshTokenApi } from "../api/refresh_token_api";
import { resetToLogin }    from "../navigation/RootNavigation";
import { useTokenStore }   from "../stores/tokenStore";

const api = axios.create({
  baseURL: "http://52.64.128.49:8080",
  timeout: 10_000,
});

/* 요청마다 accessToken 주입 */
api.interceptors.request.use((config) => {
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
    const original = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !original._retry
    ) {
      original._retry = true;

      try {
        const { refreshToken, setTokens, clear } = useTokenStore.getState();
        if (!refreshToken) throw new Error("No refreshToken");

        const fresh = await refreshTokenApi(refreshToken);
        setTokens(fresh.accessToken, fresh.refreshToken);   // SecureStore + 헤더 동기화

        original.headers.Authorization = `Bearer ${fresh.accessToken}`;
        return api(original);                               // 원 요청 재시도
      } catch (err) {
        useTokenStore.getState().clear();  // 토큰 삭제
        resetToLogin();                    // 로그인 화면으로 이동
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
