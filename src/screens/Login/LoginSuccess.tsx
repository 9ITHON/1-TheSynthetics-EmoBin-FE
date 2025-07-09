import React, { useEffect } from "react";
import { View, Text, Image, BackHandler, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import { styles } from "./LoginSuccess.style";
import { LoginSuccessNavProp } from "../../types/navigation";

const logo = require("../../../assets/logo.png");

const LoginSuccessScreen = () => {
  const navigation = useNavigation<LoginSuccessNavProp>();

  useEffect(() => {
    if (Platform.OS === "android") {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => sub.remove();
    }
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace("Login");
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [navigation]);

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
