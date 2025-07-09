import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import LoginScreen from "./src/screens/Login/LoginScreen";
import KakaoLoginWebview from "./src/screens/Login/KakaoLoginWebview";
import LoginSuccessScreen from "./src/screens/Login/LoginSuccess";
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
import FirstLogin from "./src/screens/FirstLogin/firstLogin";

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FirstLogin"
          component={FirstLogin}
          options={{ headerShown: false }}
        />

      {/* <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WriteNote"
          component={WriteNote}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Processing"
          component={Processing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmotionResult"
          component={EmotionResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyPage"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenter}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
