import React from "react";
import { View, StyleSheet } from "react-native";

interface ThermometerProps {
  temperature: number;
}

const Thermometer = ({ temperature }: ThermometerProps) => {
  const clampTemp = Math.max(0, Math.min(temperature, 100));

  return (
    <View style={styles.container}>
      <View style={styles.thermometer}>
        <View style={[styles.fill, { width: `${clampTemp}%` }]} />
        {Array.from({ length: 11 }, (_, idx) => (
          <View
            key={idx}
            style={[
              styles.tick,
              {
                left: `${idx * 10}%`,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  thermometer: {
    width: 300,
    height: 40,
    borderColor: "#333",
    borderWidth: 4,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  fill: {
    height: "100%",
    backgroundColor: "#E53E00",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 20,
  },
  tick: {
    position: "absolute",
    width: 1,
    height: 20,
    backgroundColor: "#333",
    top: 10,
  },
});

export default Thermometer;
