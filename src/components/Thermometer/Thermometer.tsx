import React from "react";
import { View } from "react-native";
import { styles } from "./Thermometer.style";
import { ThermometerProps } from "../../types/thermometer";

/* 설정값 */
const MAX_TEMP = 100;      // 최고 온도(°C)
const MAJOR_TICK = 10;      // 큰 눈금 간격(%)
const MINOR_TICKS = 9;      // 큰 눈금 사이의 작은 눈금 개수

const Thermometer = ({ temperature }: ThermometerProps) => {
  /* 0 ~ MAX_TEMP 범위로 클램프 */
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

  /* ===== 눈금 요소들 생성 ===== */

  /* ① 큰 눈금 ─ 10 % ~ 90 % (총 9개) */
  const majorTicks = Array.from({ length: 9 }, (_, i) => {
    const idx = i + 1;               // 1 ~ 9  → 10 % ~ 90 %
    return (
      <View
        key={`major-${idx}`}
        style={[styles.tickMajor, { left: `${idx * MAJOR_TICK}%` }]}
      />
    );
  });

  /* ② 작은 눈금 ─ 세그먼트 1 ~ 8 사이(10 %~90 %)만 9×8 = 72개 */
  const minorTicks: JSX.Element[] = [];
  for (let seg = 0; seg < 10; seg++) {                // ★ 1 ≤ seg ≤ 8
    for (let j = 1; j <= MINOR_TICKS; j++) {
      minorTicks.push(
        <View
          key={`minor-${seg}-${j}`}
          style={[
            styles.tickMinor,
            {
              left: `${
                seg * MAJOR_TICK + (j * MAJOR_TICK) / (MINOR_TICKS + 1)
              }%`,
            },
          ]}
        />
      );
    }
  }


  return (
    <View style={styles.container}>
      {/* ◎ 벌브 */}
      <View style={[styles.bulb, { backgroundColor: fillColor }]} />

      {/* ─── 관 + 눈금 */}
      <View style={styles.barWrapper}>
        {/* 관(튜브) */}
        <View style={styles.tube}>
          <View
            style={[
              styles.fill,
              { width: `${(clampTemp / MAX_TEMP) * 100}%`, backgroundColor: fillColor },
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
