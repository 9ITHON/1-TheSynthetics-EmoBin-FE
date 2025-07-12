import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import { refreshTokenApi } from "./src/api/refresh_token_api";
import { navigationRef } from "./src/navigation/RootNavigation";
import { useTokenStore } from "./src/stores/tokenStore";
import { useAuthStore } from "./src/stores/authStore";

import LoginScreen from "./src/screens/Login/LoginScreen";
import KakaoLoginWebview from "./src/screens/Login/KakaoLoginWebview";
import LoginSuccessScreen from "./src/screens/Login/LoginSuccess";
import FirstLogin from "./src/screens/FirstLogin/firstLogin";
import Landing from "./src/screens/Landing/Landing";
import WriteNote from "./src/screens/WriteNote/WriteNote";
import Processing from "./src/screens/Processing/Processing";
import EmotionResult from "./src/screens/EmotionResult/EmotionResult";
import History from "./src/screens/History/History";
import Navigation from "./src/screens/Nav/Navigation";
import MyPage from "./src/screens/MyPage/MyPage";
import UserInfo from "./src/screens/UserInfo/UserInfo";
import Notice from "./src/screens/Notice/Notice";
import HelpCenter from "./src/screens/HelpCenter/HelpCenter";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [initial, setInitial] = useState<
    "Landing" | "Login" | "FirstLogin" | null
  >(null);

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

  useEffect(() => {
    const unsubscribe = useTokenStore.persist.onFinishHydration(() =>
      setIsHydrated(true)
    );

    if (useTokenStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    (async () => {
      const { refreshToken, setTokens, clear } = useTokenStore.getState();
      const { backend, logout } = useAuthStore.getState();
      console.log(
        "[App.tsx] Hydration finished. Refresh token from store:",
        refreshToken?.slice(0, 20) ?? "null"
      );
      console.log(
        "[App.tsx] Hydration finished. Auth backend from store:",
        backend?.code ?? "null"
      );

      if (backend?.code === "SIGNUP_REQUIRED") {
        console.log(
          "[App.tsx] SIGNUP_REQUIRED detected. Clearing auth store and navigating to FirstLogin."
        );
        await logout();
        setInitial("FirstLogin");
        return;
      }

      if (refreshToken) {
        try {
          const fresh = await refreshTokenApi(refreshToken);
          setTokens(fresh.accessToken, fresh.refreshToken);
          setInitial("Landing");
          return;
        } catch (error) {
          console.log("[App.tsx] Refresh token failed:", error);
          setInitial("Login");
        }
      } else {
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="KakaoLoginWebview"
          component={KakaoLoginWebview}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="LoginSuccess" component={LoginSuccessScreen} />
        <Stack.Screen name="FirstLogin" component={FirstLogin} />

        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="WriteNote" component={WriteNote} />
        <Stack.Screen name="Processing" component={Processing} />
        <Stack.Screen name="EmotionResult" component={EmotionResult} />
        <Stack.Screen name="History" component={Navigation} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
