// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import { refreshTokenApi } from "./src/api/refresh_token_api";
import { navigationRef }   from "./src/navigation/RootNavigation";
import { useTokenStore }   from "./src/stores/tokenStore";
import { useAuthStore }    from "./src/stores/authStore";

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
  const [isHydrated, setIsHydrated] = useState(false);
  const [initial, setInitial] = useState<"Landing" | "Login" | "FirstLogin" | null>(null);

  /* ───────── (1) 디버그: 토큰 변화 로그 ───────── */
  useEffect(() => {
    if (!__DEV__) return;
    const unsub = useTokenStore.subscribe((s) =>
      console.log(
        "[TokenStore]",
        s.accessToken?.slice(0, 20) ?? "null",
        Date.now()
      )
    );
    return unsub;
  }, []);

  /* ───────── (2) Zustand 스토어 rehydration 대기 ───────── */
  useEffect(() => {
    const unsubscribe = useTokenStore.persist.onFinishHydration(() =>
      setIsHydrated(true)
    );

    if (useTokenStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  /* ───────── (3) rehydration 완료 후 refresh 검증 ───────── */
  useEffect(() => {
    if (!isHydrated) return;

    (async () => {
      console.log("[App.tsx] Refresh token check useEffect triggered.");
      const { refreshToken, setTokens, clear } = useTokenStore.getState();
      const { backend, logout } = useAuthStore.getState(); // useAuthStore에서 backend와 logout 가져오기
      console.log("[App.tsx] Hydration finished. Refresh token from store:", refreshToken?.slice(0, 20) ?? "null");
      console.log("[App.tsx] Hydration finished. Auth backend from store:", backend?.code ?? "null"); // backend 코드 로그 추가

      // backend.code가 MEMBER_NOT_FOUND인 경우, authStore를 초기화하고 FirstLogin 화면으로 이동
      if (backend?.code === "MEMBER_NOT_FOUND") {
        console.log("[App.tsx] MEMBER_NOT_FOUND detected. Clearing auth store and navigating to FirstLogin.");
        await logout(); // authStore 초기화
        setInitial("FirstLogin");
        return;
      }

      if (refreshToken) {
        try {
          console.log("[App.tsx] Attempting to refresh token...");
          const fresh = await refreshTokenApi(refreshToken);
          console.log("[App.tsx] Token refresh successful. Setting new tokens.");
          setTokens(fresh.accessToken, fresh.refreshToken);
          setInitial("Landing");
          return;
        } catch (error) {
          console.error("[App.tsx] Refresh token failed:", error);
          setInitial("Login"); // 이 줄을 추가합니다.
        }
      } else { // refreshToken이 없는 경우에도 로그인 화면으로 이동
        console.log("[App.tsx] No refresh token. Navigating to Login.");
        setInitial("Login");
      }
    })();
  }, [isHydrated]);

  if (!initial) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initial}
        screenOptions={{ headerShown: false }}
      >
        {/* ── 인증 스택 ── */}
        <Stack.Screen name="Login"             component={LoginScreen} />
        <Stack.Screen name="KakaoLoginWebview" component={KakaoLoginWebview} options={ {headerShown: true}}/>
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
