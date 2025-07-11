import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { ButtonProps } from "../types/button";
import { styles } from "./Button.style";

const Button: React.FC<ButtonProps> = ({ text, onPress, iconSource, style }) => (
  <TouchableOpacity style={[styles.kakaoButton, style]} onPress={onPress}>
    {iconSource && (
      <Image
        source={iconSource}
        style={styles.kakaoIcon}
        resizeMode="contain"
      />
    )}
    <Text style={styles.kakaoText}>{text}</Text>
  </TouchableOpacity>
);

export default Button;