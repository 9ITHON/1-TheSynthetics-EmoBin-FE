// src/screens/KakaoLoginWebview.tsx
// 카카오 OAuth WebView → 토큰 교환 → 프로필 저장 + Login 화면으로 전달

import React, { useRef } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import {
  exchangeKakaoToken,
  fetchKakaoProfile,
  REDIRECT_URI,
  AUTH_URL,
} from "../api/kakao_api";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuthStore, KakaoProfile } from "../stores/authStore";

// ────────────────────────────────────────────────────────────────
// Stack Param 정의 (React‑Navigation v6 기준)
// ────────────────────────────────────────────────────────────────

type RootStackParamList = {
  Login: { profile?: KakaoProfile } | undefined;
  KakaoLoginWebview: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "KakaoLoginWebview"
>;

// ────────────────────────────────────────────────────────────────
// 컴포넌트
// ────────────────────────────────────────────────────────────────

export default function KakaoLoginWebview({ navigation }: Props) {
  const webRef = useRef<WebView>(null);

  /**
   * 리다이렉트 URL 감지 → 토큰 교환 → 프로필 저장
   */
  const onNavChange = async ({ url }: { url: string }) => {
    // 1) 리다이렉트가 아니면 무시
    if (!url.startsWith(REDIRECT_URI)) return;

    // 2) code 추출
    const code = new URL(url).searchParams.get("code");
    if (!code) return;

    // 3) WebView 로딩 중단 (더 이상 페이지 이동 필요 X)
    webRef.current?.stopLoading();

    try {
      // 4) 인가코드 → 토큰
      const token = await exchangeKakaoToken(code);
      const { access_token } = token;

      // 5) 프로필 조회
      const kakaoProfile = await fetchKakaoProfile(access_token);

      // 6) 전역 상태 저장 (zustand)
      useAuthStore.getState().setProfile(kakaoProfile);

      // 7) Login 화면으로 전환 + 파라미터 전달
      navigation.replace("Login", { profile: kakaoProfile });

      // 8) 디버그 로그
      console.log("[Kakao] access_token:", access_token);
      console.log("[Kakao] profile:", kakaoProfile);
    } catch (e) {
      console.warn("카카오 토큰 교환 실패", e);
      navigation.goBack();
    }
  };

  return (
    <WebView
      ref={webRef}
      source={{ uri: AUTH_URL }}
      onNavigationStateChange={onNavChange}
      startInLoadingState
      renderLoading={() => <ActivityIndicator style={{ flex: 1 }} />}
      incognito
    />
  );
}
