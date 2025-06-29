import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Button from "../components/Button"; // 경로 확인

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 카카오 로그인 버튼 */}
      <Button
        text="카카오 로그인"
        iconSource={require("../../assets/kakao.png")}
        onPress={() => {
          console.log("카카오 로그인 클릭");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF1",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  logo: {
    width: 214,
  },
});
