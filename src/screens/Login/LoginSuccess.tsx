// src/screens/LoginSuccess.tsx
// 로그인 성공 후 표시되는 Splash-like 화면
// -------------------------------------------------------------
// React Native 0.65+ 부터 `BackHandler.removeEventListener()` 는 deprecated.
// addEventListener 가 돌려주는 subscription 객체의 `remove()` 를 호출해야 합니다.
// 이 버전에 맞게 수정했습니다.

import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./LoginSuccess.style";

// 로고 이미지 (프로젝트 구조에 맞게 경로 조정)
const logo = require("../../assets/logo.png");

type Props = NativeStackScreenProps<RootStackParamList, "LoginSuccess">;

export default function LoginSuccessScreen({}: Props) {
  // Android 하드웨어 back 버튼 비활성화
  useEffect(() => {
    if (Platform.OS === "android") {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true // true 반환 → 이벤트 소비, 뒤로가기 무시
      );
      return () => subscription.remove();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerBox}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>덜어내는 공간</Text>
      </View>
      <Text style={styles.footer}>The Synthetics</Text>
    </SafeAreaView>
  );
}
