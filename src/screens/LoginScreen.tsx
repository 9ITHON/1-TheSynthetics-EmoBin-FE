// ───────── LoginScreen.tsx (변경 無) ─────────
import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import { kakaoLogin } from "../api/kakao_api";

export default function LoginScreen() {
  const [profile, setProfile] = useState<any>(null);

  const handleKakaoLogin = async () => {
    try {
      const { profile } = await kakaoLogin();   // ← 그대로
      setProfile(profile);
      Alert.alert(
        "로그인 성공",
        `환영합니다, ${profile.kakao_account?.profile?.nickname || "사용자"}님!`
      );
    } catch (err) {
      console.error("카카오 로그인 실패:", err);
      Alert.alert("로그인 실패", "카카오 로그인에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")}
               style={styles.logo} resizeMode="contain" />
      </View>

      <Button
        text="카카오 로그인"
        iconSource={require("../../assets/kakao.png")}
        onPress={handleKakaoLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFBF1", justifyContent: "center", alignItems: "center" },
  logoContainer: { alignItems: "center", marginBottom: 80 },
  logo: { width: 214 },
});
