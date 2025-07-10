// src/screens/Login/LoginScreen.tsx
import React, { useEffect } from "react";
import { View, Image, Alert } from "react-native";
import Button from "../../components/Button";
import { useAuthStore } from "../../stores/authStore";
import { styles } from "./LoginScreen.style";
import type { LoginScreenProps } from "../../types/login";
import { saveTokens } from "../../utils/tokenStorage";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const profile  = useAuthStore((s) => s.profile);
  const backend  = useAuthStore((s) => s.backend);

  useEffect(() => {
    if (!backend || !profile) return;

    if (backend.code === "MEMBER_NOT_FOUND") {
      Alert.alert("회원가입 필요");
      navigation.reset({
        index: 0,
        routes: [{ name: "FirstLogin" }],
      });
    } else {
      console.log(backend);
      /* 🔑 토큰 안전 저장 */
      if ("accessToken" in backend && "refreshToken" in backend) {
        saveTokens(backend.accessToken as string, backend.refreshToken as string)
          .catch(console.warn);
      }

      Alert.alert(
        "로그인 성공",
        `환영합니다, ${profile.profile?.nickname || "사용자"}님!`
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "Landing" }],
      });
    }
  }, [backend, profile, navigation]);

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
