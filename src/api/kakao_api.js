// src/api/kakao_api.js
import qs from "qs";

export const REST_KEY      = "ce11a8c09ff42d519d2257d412297dc7";
export const REDIRECT_URI = "https://dummy.emobin.app/oauth"; 

export const AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?" +
  new URLSearchParams({
    client_id: REST_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "profile_nickname",     // ← 이메일 제외
  }).toString();

export async function exchangeKakaoToken(code) {
  const res = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: qs.stringify({
      grant_type: "authorization_code",
      client_id:  REST_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    }),
  });
  if (!res.ok) throw new Error("token exchange failed");
  return res.json();      // { access_token, refresh_token, ... }
}

export async function fetchKakaoProfile(accessToken) {
  const res = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}
