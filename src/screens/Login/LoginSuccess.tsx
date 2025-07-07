import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./LoginSuccess.style";
import { PropsSuccess } from "../../types/login"

const logo = require("../../../assets/logo.png");


const LoginSuccessScreen: React.FC<PropsSuccess> = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => true); // 뒤로가기 막기
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
};

export default LoginSuccessScreen;