import axios from "axios";
import { refreshTokenApi } from "../api/refresh_token_api";
import { resetToLogin }    from "../navigation/RootNavigation";
import { loadTokens, saveTokens, clearTokens } from "./tokenStorage";

const api = axios.create({
  baseURL: "http://52.64.128.49:8080",   // ← 실서버 주소
  timeout: 10000,
});

/* 요청 헤더에 accessToken 주입 */
api.interceptors.request.use(async (config) => {
  const { accessToken } = await loadTokens();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

/* 401/403 응답 처리 */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      try {
        const { refreshToken } = await loadTokens();
        if (!refreshToken) throw new Error("No refreshToken");

        const fresh = await refreshTokenApi(refreshToken);   // ← API 호출
        await saveTokens(fresh.accessToken, fresh.refreshToken);

        /* 새 토큰으로 원 요청 재시도 */
        original.headers.Authorization = `Bearer ${fresh.accessToken}`;
        return api(original);
      } catch (e) {
        /* 📌 최종 실패 → 토큰 삭제 + 스택 초기화 */
        await clearTokens();
        resetToLogin();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
