import React from "react";
import { View } from "react-native";
import { styles } from "./Thermometer.style";
import { ThermometerProps } from "../../types/thermometer";

const MAX_TEMP = 60;         
const INTERVALS = 6;           
const MAJOR_STEP = 100 / INTERVALS;  
const MINOR_TICKS = 9;        

const Thermometer = ({ temperature }: ThermometerProps) => {
  const clampTemp = Math.max(0, Math.min(temperature, MAX_TEMP));

  const getFillColor = (t: number) => {
    if (t < 16.5) return "#84AFD5";
    if (t < 24.5) return "#BE86B8";
    if (t < 32.5) return "#96CA76";
    if (t < 40.5) return "#F3B4A2";
    return "#F1A85C";
  };
  const fillColor = getFillColor(clampTemp);


  const majorTicks = Array.from({ length: INTERVALS - 1 }).map((_, i) => {
    const idx = i + 1;
    return (
      <View
        key={`major-${idx}`}
        style={[
          styles.tickMajor,
          { left: `${idx * MAJOR_STEP}%` },
        ]}
      />
    );
  });

const minorTicks = Array.from({ length: INTERVALS }).flatMap((_, seg) =>
  Array.from({ length: MINOR_TICKS }).flatMap((_, j) => {
    if (seg === INTERVALS - 1 && j >= MINOR_TICKS - 2) return [];

    return (
      <View
        key={`minor-${seg}-${j}`}
        style={[
          styles.tickMinor,
          {
            left:
              seg * MAJOR_STEP +
              ((j + 1) * MAJOR_STEP) / (MINOR_TICKS + 1) +
              "%",
          },
        ]}
      />
    );
  })
);

  return (
    <View style={styles.container}>
      <View style={styles.bulb}>
        <View style={[styles.bulbInner, { backgroundColor: fillColor }]} />
      </View>

      <View style={styles.barWrapper}>
        <View style={styles.tube}>
          <View
            style={[
              styles.fill,
              {
                width: `${(clampTemp / MAX_TEMP) * 100}%`,
                backgroundColor: fillColor,
              },
            ]}
          />
        </View>

        {majorTicks}
        {minorTicks}
      </View>
    </View>
  );
};

export default Thermometer;
