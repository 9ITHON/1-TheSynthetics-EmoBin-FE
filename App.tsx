// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import { loadTokens, saveTokens, clearTokens } from "./src/utils/tokenStorage";
import { refreshTokenApi } from "./src/api/refresh_token_api";
import { navigationRef }   from "./src/navigation/RootNavigation";

// ─── Screens ────────────────────────────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initial, setInitial] = useState<"Landing" | "Login" | null>(null);

  useEffect(() => {
    (async () => {
      const { refreshToken } = await loadTokens();

      if (refreshToken) {
        try {
          const fresh = await refreshTokenApi(refreshToken);
          await saveTokens(fresh.accessToken, fresh.refreshToken);
          setInitial("Landing");          // ✅ 성공 → 메인
          return;
        } catch (e) {
          await clearTokens();            // 만료·오류 → 토큰 제거
        }
      }
      setInitial("Login");                // 토큰 없거나 실패
    })();
  }, []);

  if (!initial) return null;              // 로딩 화면 / 스플래시 넣어도 OK

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initial} screenOptions={{ headerShown:false }}>
        {/* 인증 스택 */}
        <Stack.Screen name="Login"             component={LoginScreen} />
        <Stack.Screen name="KakaoLoginWebview" component={KakaoLoginWebview} />
        <Stack.Screen name="LoginSuccess"      component={LoginSuccessScreen} />
        <Stack.Screen name="FirstLogin"        component={FirstLogin} />

        {/* 메인 스택 */}
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