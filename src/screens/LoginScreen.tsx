import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 공간 */}
      <View style={styles.logoContainer}>
        <Text style={styles.subtitle}>넘어내는 공간</Text>
        <Text style={styles.logo}>logo</Text>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.kakaoButton} onPress={() => {}}>
          {/* 아이콘 예시: 텍스트로 대체 */}
          <Text style={styles.kakaoIcon}>💬</Text>
          <Text style={styles.kakaoText}>카카오 로그인</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    width: "80%",
  },
  kakaoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE500",
    paddingVertical: 14,
    borderRadius: 24,
  },
  kakaoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  kakaoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
