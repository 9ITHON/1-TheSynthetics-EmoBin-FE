// src/screens/KakaoLoginWebview.tsx
import React, { useRef } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { exchangeKakaoToken, fetchKakaoProfile, REDIRECT_URI, AUTH_URL } from "../api/kakao_api";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuthStore } from '../stores/authStore';

type RootStack = {
  Login: { profile?: any } | undefined;  // ✅ profile 파라미터 추가
  KakaoLoginWebview: undefined;
};

export default function KakaoLoginWebview({
  navigation,
}: NativeStackScreenProps<RootStack, "KakaoLoginWebview">) {
  const webRef = useRef<WebView>(null);

  const onNavChange = async ({ url }: { url: string }) => {
    if (!url.startsWith(REDIRECT_URI)) return;

    // 1) code 파싱
    const code = new URL(url).searchParams.get("code");
    if (!code) return;

    // 2) 로딩 중단
    webRef.current?.stopLoading();

    try {
      // 3) 토큰 · 프로필
      const token = await exchangeKakaoToken(code);
      const profile = await fetchKakaoProfile(token.access_token);

      useAuthStore.getState().setProfile(profile);
      navigation.replace('Login');

      console.log("[Kakao] access_token:", token.access_token);
      console.log("[Kakao] profile:", profile);


      // 4) LoginScreen 으로 결과 전달
      navigation.replace("Login", { profile });   // or emit 이벤트
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
