import React, { useRef } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import {
  exchangeKakaoToken,
  fetchKakaoProfile,
  REDIRECT_URI,
  AUTH_URL,
} from "../../api/KakaoLogin/kakao_api";
import { memberCheck }        from "../../api/member_check_api";
import { useAuthStore }       from "../../stores/authStore";
import { Props }              from "../../types/webview";

const KakaoLoginWebview = ({ navigation }: Props) => {
  const webRef = useRef<WebView>(null);

  const { setProfile, setBackend } = useAuthStore.getState();

  const onNavChange = async ({ url }: { url: string }) => {
    if (!url.startsWith(REDIRECT_URI)) return;

    const code = new URL(url).searchParams.get("code");
    if (!code) return;

    webRef.current?.stopLoading();

    try {
      // const { access_token } = await exchangeKakaoToken(code);
      // const kakaoProfile     = await fetchKakaoProfile(access_token);
      // setProfile(kakaoProfile);

      // console.log("[Kakao] access_token:", access_token);
      // console.log("[Kakao] profile:", kakaoProfile);

      console.log(code);
      const backend = await memberCheck(code);
      setBackend(backend);

      navigation.replace("Login");
    } catch (e) {
      console.warn("카카오 로그인 처리 실패", e);
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
