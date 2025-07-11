import React, { useRef } from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { REDIRECT_URI, AUTH_URL } from "../../api/KakaoLogin/kakao_api";
import { memberCheck }        from "../../api/member_check_api";
import { useAuthStore }       from "../../stores/authStore";
import { Props }              from "../../types/webview";

const KakaoLoginWebview = ({ navigation }: Props) => {
  const webRef       = useRef<WebView>(null);
  const isProcessing = useRef(false);

  const { setBackend } = useAuthStore.getState();

  const onNavChange = async ({ url }: { url: string }) => {
    if (!url.startsWith(REDIRECT_URI) || isProcessing.current) return;

    const code = new URL(url).searchParams.get("code");
    if (!code) return;

    isProcessing.current = true;
    webRef.current?.stopLoading();

    try {
      console.log("code :",code)
      const backend = await memberCheck(code);
      console.log(backend)
      setBackend(backend);

      navigation.replace("Login");
    } catch (e) {
      console.warn("카카오 로그인 처리 실패", e);
      isProcessing.current = false;
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
