// src/screens/Login/LoginScreen.tsx
import React, { useEffect } from "react";
import { View, Image, Alert } from "react-native";
import Button from "../../components/Button";
import { useAuthStore } from "../../stores/authStore";
import { styles } from "./LoginScreen.style";
import type { LoginScreenProps } from "../../types/login";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  /** ✅ Zustand 상태 */
  const profile  = useAuthStore((s) => s.profile);
  const backend  = useAuthStore((s) => s.backend);

  /**
   * ▸ 백엔드 응답에 따라 분기
   *   - code === "MEMBER_NOT_FOUND" → FirstLogin
   *   - 그 외(정상 로그인)         → LoginSuccess
   */
  useEffect(() => {
    if (!backend || !profile) return;           // 아직 응답이 없으면 대기

    console.log("[Login] profile:", profile);
    console.log("[Login] backend:", backend);

    if (backend.code === "MEMBER_NOT_FOUND") {
      Alert.alert(
        "회원가입 필요",
      );
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "FirstLogin",
          },
        ],
      });
    } else {
      Alert.alert(
        "로그인 성공",
        `환영합니다, ${profile.profile?.nickname || "사용자"}님!`
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginSuccess" }],
      });
    }
  }, [backend, profile, navigation]);

  /** 카카오 로그인 버튼 클릭 → WebView 화면 이동 */
  const handleKakaoLogin = () => navigation.navigate("KakaoLoginWebview");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Button
        text="카카오 로그인"
        iconSource={require("../../../assets/kakao.png")}
        onPress={handleKakaoLogin}
      />
    </View>
  );
};

export default LoginScreen;
