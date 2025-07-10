import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  KakaoLoginWebview: undefined;
  LoginSuccess: undefined;
  MyPage: undefined;
  UserInfo: undefined;
  Notice: undefined;
  HelpCenter: undefined;
  Landing: undefined;
  WriteNote: undefined;
  Processing: { noteText: string };
  EmotionResult: { result: any };
  History: undefined;
};

export type NavParamList = {
  History: undefined;
  Landing: undefined;
  MyPage: undefined;
};

export type LoginSuccessNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginSuccess"
>;
