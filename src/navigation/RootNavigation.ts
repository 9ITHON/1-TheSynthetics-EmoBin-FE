import {
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const resetToLogin = () => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }
};