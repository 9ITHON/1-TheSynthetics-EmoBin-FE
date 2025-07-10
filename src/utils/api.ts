// src/utils/api.ts
import axios from "axios";
import { refreshTokenApi } from "../api/refresh_token_api";
import { resetToLogin }    from "../navigation/RootNavigation";
import { useTokenStore }   from "../stores/tokenStore";   // ✅ 토큰 zustand

/* ───── Axios 인스턴스 ───── */
const api = axios.create({
  baseURL: "http://52.64.128.49:8080",
  timeout: 10_000,
});

/* ① 매 요청마다 accessToken 헤더 주입 */
api.interceptors.request.use((config) => {
  const { accessToken } = useTokenStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/* ② 401 / 403 응답 → refresh 재발급 */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    /* 동일 요청 무한 루프 방지 */
    if ((error.response?.status === 401 || error.response?.status === 403) && !original._retry) {
      original._retry = true;

      try {
        const { refreshToken, setTokens } = useTokenStore.getState();
        if (!refreshToken) throw new Error("No refreshToken");

        /* 서버에 새 토큰 요청 */
        const fresh = await refreshTokenApi(refreshToken);
        setTokens(fresh.accessToken, fresh.refreshToken);   // SecureStore + 헤더 동기화

        /* 갱신된 토큰으로 원 요청 재시도 */
        original.headers.Authorization = `Bearer ${fresh.accessToken}`;
        return api(original);
      } catch (e) {
        /* 최종 실패 → 토큰 제거 + 로그인 화면 */
        useTokenStore.getState().clear();
        resetToLogin();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
