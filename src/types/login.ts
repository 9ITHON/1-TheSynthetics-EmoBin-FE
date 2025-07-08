import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

export type PropsSuccess = NativeStackScreenProps<
  RootStackParamList,
  "LoginSuccess"
>;

export type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;
