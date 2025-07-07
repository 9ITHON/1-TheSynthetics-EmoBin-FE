// src/screens/LoginScreen.tsx
import React, { useEffect } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import Button from "../../components/Button";
import { useAuthStore } from "../../stores/authStore";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./LoginScreen.style";

/** ─────────────────────────────
 *  네비게이터 타입
 *  (Login 스크린은 이제 파라미터를 받지 않으므로 `undefined`)
 *  ────────────────────────────*/

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) {
  /** ▸ 전역 스토어에서 프로필 불러오기 */
  const profile = useAuthStore((s) => s.profile);

  /** ▸ 프로필이 처음 저장될 때 한 번만 토스트 + 로그 */
  useEffect(() => {
    if (profile) {
      console.log("[Login] profile 전달 완료:", profile);
      Alert.alert(
        "로그인 성공",
        `환영합니다, ${
          profile.profile?.nickname || "사용자"
        }님!`
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginSuccess" }],
      });
      navigation.replace("LoginSuccess");
    }
  }, [profile]);

  /** ▸ WebView 화면으로 이동 */
  const handleKakaoLogin = () => navigation.navigate("KakaoLoginWebview");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Button
        text="카카오 로그인"
        iconSource={require("../../assets/kakao.png")}
        onPress={handleKakaoLogin}
      />
    </View>
  );
}

