import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, GestureResponderEvent } from "react-native";

interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  iconSource: any; // require() 이미지 경로
}

export default function Button({ text, onPress, iconSource }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.kakaoButton} onPress={onPress}>
      <Image
        source={iconSource}
        style={styles.kakaoIcon}
        resizeMode="contain"
      />
      <Text style={styles.kakaoText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  kakaoButton: {
    width: 310,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE500",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  kakaoIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  kakaoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
