import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  iconSource: any;
}
