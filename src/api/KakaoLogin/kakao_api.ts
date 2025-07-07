// src/api/kakao_api.ts
// Kakao OAuth helper (axios + TypeScript)
// =============================================================
// - Interfaces `KakaoToken`, `KakaoProfile`
// - Strict type annotations on functions
// - Easily migratable from previous JS version

import axios from "axios";
import qs from "qs";

// ────────────────────────────────────────────────────────────────
// Kakao OAuth constants
// ────────────────────────────────────────────────────────────────
export const REST_KEY = "ce11a8c09ff42d519d2257d412297dc7";
export const REDIRECT_URI = "https://dummy.emobin.app/oauth";

export const AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?" +
  new URLSearchParams({
    client_id: REST_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "profile_nickname", // 이메일 scope 제외
  }).toString();

// ────────────────────────────────────────────────────────────────
// Type definitions
// ────────────────────────────────────────────────────────────────

export interface KakaoToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface KakaoProfile {
  id: string; // Kakao user id (문자열)
  profile: {
    nickname: string;
    profile_image_url?: string;
    thumbnail_image_url?: string;
  };
  email?: string;
}

// ────────────────────────────────────────────────────────────────
// API helpers
// ────────────────────────────────────────────────────────────────

/**
 * 교환된 code 값을 OAuth 토큰으로 변환합니다.
 */
export async function exchangeKakaoToken(code: string): Promise<KakaoToken> {
  try {
    const { data } = await axios.post<KakaoToken>(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (error: any) {
    const { status, statusText } = error.response ?? {};
    throw new Error(
      `Kakao token exchange failed${status ? `: ${status} ${statusText}` : ""}`
    );
  }
}

/**
 * 액세스 토큰으로 카카오 사용자 프로필 조회
 * 반환 값은 사용 편의성을 위해 핵심 필드만 정규화합니다.
 */
export async function fetchKakaoProfile(
  accessToken: string
): Promise<KakaoProfile> {
  try {
    const { data } = await axios.get<any>(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const kakaoProfile: KakaoProfile = {
      id: String(data.id),
      profile: data.kakao_account?.profile ?? {},
      email: data.kakao_account?.email,
    };

    return kakaoProfile;
  } catch (error: any) {
    const { status, statusText } = error.response ?? {};
    throw new Error(
      `Fetching Kakao profile failed${status ? `: ${status} ${statusText}` : ""}`
    );
  }
}

// ────────────────────────────────────────────────────────────────
// Optional: axios instance for reuse
// ────────────────────────────────────────────────────────────────

export const kakaoApi = axios.create({
  baseURL: "https://kapi.kakao.com",
});