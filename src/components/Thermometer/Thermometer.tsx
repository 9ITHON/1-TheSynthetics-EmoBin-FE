import React from "react";
import { View } from "react-native";
import { styles } from "./Thermometer.style";
import { ThermometerProps } from "../../types/thermometer";

/* === 설정값 === */
const MAX_TEMP = 60;            // 온도계 상한(℃)
const INTERVALS = 6;            // 0~60 ℃를 10 ℃씩 나눈 구간 개수
const MAJOR_STEP = 100 / INTERVALS;   // 큰 눈금 간격(%) ≈ 16.6667
const MINOR_TICKS = 9;          // 큰 눈금 사이의 작은 눈금 개수

const Thermometer = ({ temperature }: ThermometerProps) => {
  /* 0~MAX_TEMP 범위로 클램프 */
  const clampTemp = Math.max(0, Math.min(temperature, MAX_TEMP));

  /* 구간별 색상 */
  const getFillColor = (t: number) => {
    if (t < 16.5) return "#84AFD5";
    if (t < 24.5) return "#BE86B8";
    if (t < 32.5) return "#96CA76";
    if (t < 40.5) return "#F3B4A2";
    return "#F1A85C";
  };
  const fillColor = getFillColor(clampTemp);

  /* ===== 눈금 요소 ===== */

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
    Array.from({ length: MINOR_TICKS }).map((_, j) => (
      <View
        key={`minor-${seg}-${j}`}
        style={[
          styles.tickMinor,
          {
            left: `${
              seg * MAJOR_STEP + ((j + 1) * MAJOR_STEP) / (MINOR_TICKS + 1)
            }%`,
          },
        ]}
      />
    ))
  );

  return (
    <View style={styles.container}>
      {/* ◎ 벌브 */}
      <View style={styles.bulb}>
        <View style={[styles.bulbInner, { backgroundColor: fillColor }]} />
      </View>

      {/* ─── 관 + 눈금 */}
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

        {/* 눈금 레이어 */}
        {majorTicks}
        {minorTicks}
      </View>
    </View>
  );
};

export default Thermometer;
