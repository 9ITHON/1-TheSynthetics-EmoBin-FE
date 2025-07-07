// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import LoginScreen from "./src/screens/Login/LoginScreen";
import KakaoLoginWebview from "./src/screens/Login/KakaoLoginWebview";
import LoginSuccessScreen from "./src/screens/Login/LoginSuccess";

/** ─────────────────────────────
 *  네비게이터 파라미터 타입
 *  (Zustand 전역 스토어 사용 → 스택 파라미터 불필요)
 *  ────────────────────────────*/


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KakaoLoginWebview"
          component={KakaoLoginWebview}
          options={{ title: "카카오 로그인" }}
        />
        <Stack.Screen
          name="LoginSuccess"
          component={LoginSuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
