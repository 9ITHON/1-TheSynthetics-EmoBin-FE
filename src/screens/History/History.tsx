import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Calendar, LocaleConfig } from "react-native-calendars";
import api from "../../utils/api";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./History.styles";
import Avatar from "../../../assets/images/avatar.svg";
import BackIcon from "../../../assets/icons/back.svg";
import Thermometer from "../../components/Thermometer/Thermometer";
import { SummaryResponse } from "../../types/thermometer";

LocaleConfig.locales["ko"] = {
  monthNames: [...Array(12)].map((_, i) => `${i + 1}월`),
  monthNamesShort: [...Array(12)].map((_, i) => `${i + 1}월`),
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const History = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [temperatureValue, setTemperatureValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const now = new Date();
        const month = now.toISOString().slice(0, 7);
        const response = await api.get<SummaryResponse>(
          "/api/emotion-temperature/summary",
          { params: { month } }
        );
        const value = response.data.data.monthlyTemperature;
        setTemperatureValue(value === 0.0 ? 36.5 : value);
      } catch (error: any) {
        Alert.alert("오류", "감정 온도 정보를 불러오지 못했어요.");
      }
    };
    fetchTemperature();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>히스토리</Text>
      </View>

      <View style={styles.temperatureCard}>
        <View style={styles.cardContent}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <Avatar style={styles.avatarSvg} />
            </View>
          </View>

          <View style={styles.temperatureInfo}>
            <Text style={styles.username}>민주님</Text>
            <Text style={styles.temperatureLabel}>
              온도{" "}
              {temperatureValue !== null
                ? `${temperatureValue}℃`
                : "로딩 중..."}
            </Text>
            {temperatureValue !== null && (
              <Thermometer temperature={temperatureValue} />
            )}
          </View>
        </View>
      </View>

      <View style={styles.monthlySection}>
        <Text style={styles.monthlyTitle}>월간기록</Text>
        <View style={styles.calendar}>
          <Calendar
            current={new Date().toISOString().slice(0, 10)}
            markingType="period"
            markedDates={{
              "2025-07-01": {
                startingDay: true,
                endingDay: true,
                color: "#F5D85C",
                textColor: "#000",
              },
              "2025-07-06": {
                startingDay: true,
                color: "#F5D85C",
                textColor: "#000",
              },
              "2025-07-07": { color: "#F5D85C", textColor: "#000" },
              "2025-07-08": {
                endingDay: true,
                color: "#F5D85C",
                textColor: "#000",
              },
            }}
            monthFormat="yyyy년 MM월"
            theme={{
              todayTextColor: "#F5B500",
              selectedDayTextColor: "#000",
              arrowColor: "#333",
              textSectionTitleColor: "#333",
              textMonthFontWeight: "bold",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default History;
