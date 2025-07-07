import React, { useEffect } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import Button from "../../components/Button";
import { useAuthStore } from "../../stores/authStore";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./LoginScreen.style";


type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const profile = useAuthStore((s) => s.profile);

  useEffect(() => {
    if (profile) {
      console.log("[Login] profile 전달 완료:", profile);
      Alert.alert(
        "로그인 성공",
        `환영합니다, ${profile.profile?.nickname || "사용자"}님!`
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginSuccess" }],
      });
    }
  }, [profile, navigation]);

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

