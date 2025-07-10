// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import { refreshTokenApi } from "./src/api/refresh_token_api";
import { navigationRef }   from "./src/navigation/RootNavigation";
import { useTokenStore }   from "./src/stores/tokenStore";

/* ─── Screens ───────────────────────────────────────────── */
import LoginScreen        from "./src/screens/Login/LoginScreen";
import KakaoLoginWebview  from "./src/screens/Login/KakaoLoginWebview";
import LoginSuccessScreen from "./src/screens/Login/LoginSuccess";
import FirstLogin         from "./src/screens/FirstLogin/firstLogin";

import Landing            from "./src/screens/Landing/Landing";
import WriteNote          from "./src/screens/WriteNote/WriteNote";
import Processing         from "./src/screens/Processing/Processing";
import EmotionResult      from "./src/screens/EmotionResult/EmotionResult";
import History            from "./src/screens/History/History";
import Navigation         from "./src/screens/Nav/Navigation";
import MyPage             from "./src/screens/MyPage/MyPage";
import UserInfo           from "./src/screens/UserInfo/UserInfo";
import Notice             from "./src/screens/Notice/Notice";
import HelpCenter         from "./src/screens/HelpCenter/HelpCenter";
/* ───────────────────────────────────────────────────────── */

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  /** refresh 검증 성공 → "Landing", 실패 → "Login" */
  const [initial, setInitial] = useState<"Landing" | "Login" | null>(null);

  /* ───────── (1) 디버그: 토큰 변화 로그 ───────── */
  useEffect(() => {
    if (!__DEV__) return;                       // 릴리스 빌드에서는 생략
    const unsub = useTokenStore.subscribe((s) =>
      console.log(
        "[TokenStore]",
        s.accessToken?.slice(0, 20) ?? "null",
        Date.now()
      )
    );
    return unsub;                               // 언마운트 시 구독 해제
  }, []);

  /* ───────── (2) 부트스트랩 refresh 검증 ───────── */
  useEffect(() => {
    (async () => {
      const { refreshToken, setTokens, clear } = useTokenStore.getState();

      if (refreshToken) {
        try {
          /* 🔄 서버에 refreshToken 검증 → 새 토큰 쌍 */
          const fresh = await refreshTokenApi(refreshToken);
          await setTokens(fresh.accessToken, fresh.refreshToken); // SecureStore + Axios 헤더 동기화
          setInitial("Landing");                                 // 검증 성공
          return;
        } catch {
          clear();                                               // 만료·오류 → 토큰 제거
        }
      }
      setInitial("Login");                                       // 토큰 없거나 실패
    })();
  }, []);

  /* 부트스트랩 중이면 스플래시 또는 로딩 화면을 넣어도 좋습니다 */
  if (!initial) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initial}
        screenOptions={{ headerShown: false }}
      >
        {/* ── 인증 스택 ── */}
        <Stack.Screen name="Login"             component={LoginScreen} />
        <Stack.Screen name="KakaoLoginWebview" component={KakaoLoginWebview} />
        <Stack.Screen name="LoginSuccess"      component={LoginSuccessScreen} />
        <Stack.Screen name="FirstLogin"        component={FirstLogin} />

        {/* ── 메인 스택 ── */}
        <Stack.Screen name="Landing"       component={Landing} />
        <Stack.Screen name="WriteNote"     component={WriteNote} />
        <Stack.Screen name="Processing"    component={Processing} />
        <Stack.Screen name="EmotionResult" component={EmotionResult} />
        <Stack.Screen name="History"       component={Navigation} />
        <Stack.Screen name="MyPage"        component={Navigation} />
        <Stack.Screen name="UserInfo"      component={UserInfo} />
        <Stack.Screen name="Notice"        component={Notice} />
        <Stack.Screen name="HelpCenter"    component={HelpCenter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
