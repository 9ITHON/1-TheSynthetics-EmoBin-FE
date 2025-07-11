import React from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "../Thermometer/Thermometer.style";
import { ThermometerProps } from "../../types/thermometer";

const Thermometer = ({ temperature }: ThermometerProps) => {
  const clampTemp = Math.max(0, Math.min(temperature, 100));

  const getFillColor = (temp: number) => {
    if (16.5 <= temp && temp < 24.5) return "#84AFD5";
    if (temp <= 24.5 && temp < 32.5) return "#BE86B8";
    if (temp <= 32.5 && temp < 40.5) return "#96CA76";
    if (temp <= 40.5 && temp <= 48.5) return "#F3B4A2";
    return "#F1A85C";
  };

  const fillColor = getFillColor(clampTemp);

  return (
    <View style={styles.container}>
      <View style={styles.thermometer}>
        <View
          style={[
            styles.fill,
            { width: `${clampTemp}%`, backgroundColor: fillColor },
          ]}
        />
        {Array.from({ length: 11 }, (_, idx) => (
          <View key={idx} style={[styles.tick, { left: `${idx * 10}%` }]} />
        ))}
      </View>
    </View>
  );
};

export default Thermometer;
