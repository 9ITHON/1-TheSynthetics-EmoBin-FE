import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KakaoProfile } from "../stores/authStore";

export type RootStackParamList = {
  Login: { profile?: KakaoProfile } | undefined;
  KakaoLoginWebview: undefined;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "KakaoLoginWebview"
>;