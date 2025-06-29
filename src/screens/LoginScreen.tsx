import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <View style={styles.logoContainer}>
        <Text style={styles.subtitle}>넘어내는 공간</Text>
        <Text style={styles.logo}>logo</Text>
      </View>

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity style={styles.kakaoButton} onPress={() => {}}>
        <Image
          source={require("../../assets/kakao.png")}
          style={styles.kakaoIcon}
          resizeMode="contain"
        />
        <Text style={styles.kakaoText}>카카오 로그인</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6EE",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  logo: {
    fontSize: 48,
    color: "#ccc",
    fontWeight: "300",
  },
  kakaoButton: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE500",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  kakaoIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  kakaoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
