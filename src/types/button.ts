import { GestureResponderEvent, ViewStyle } from "react-native";

export interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  iconSource?: any; 
  style?: ViewStyle; 
}

export interface YesNoButtonsProps {
  onYes: () => void;
  onNo: () => void;
  yesText?: string;
  noText?: string;
}