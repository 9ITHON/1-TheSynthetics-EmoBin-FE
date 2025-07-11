import { View, StyleSheet } from "react-native";
import { styles } from "../Thermometer/Thermometer.style";
import { ThermometerProps } from "../../types/thermometer";

const Thermometer = ({ temperature }: ThermometerProps) => {
  const clampTemp = Math.max(0, Math.min(temperature, 100));

  const fillColor = temperature <= 30 ? "#3B82F6" : "#E53E00";

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

export default Thermometer;
