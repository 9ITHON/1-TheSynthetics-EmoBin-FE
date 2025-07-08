import React, { useRef } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import {
  exchangeKakaoToken,
  fetchKakaoProfile,
  REDIRECT_URI,
  AUTH_URL,
} from "../../api/KakaoLogin/kakao_api";
import { useAuthStore } from "../../stores/authStore";
import { Props } from "../../types/webview";

const KakaoLoginWebview = ({ navigation }: Props) => {
  const webRef = useRef<WebView>(null);

  const onNavChange = async ({ url }: { url: string }) => {
    if (!url.startsWith(REDIRECT_URI)) return;

    const code = new URL(url).searchParams.get("code");
    if (!code) return;

    webRef.current?.stopLoading();

    try {
      const token = await exchangeKakaoToken(code);
      const { access_token } = token;

      const kakaoProfile = await fetchKakaoProfile(access_token);

      useAuthStore.getState().setProfile(kakaoProfile);

      navigation.replace("Login", { profile: kakaoProfile });

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
};

export default KakaoLoginWebview;
