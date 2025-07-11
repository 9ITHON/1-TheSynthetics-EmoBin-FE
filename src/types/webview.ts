import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KakaoProfile } from "./auth";

export type RootStackParamList = {
  Login: { profile?: KakaoProfile } | undefined;
  KakaoLoginWebview: undefined;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "KakaoLoginWebview"
>;