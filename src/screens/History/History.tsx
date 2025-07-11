import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Calendar, LocaleConfig } from "react-native-calendars";
import axios from "axios";
import api from "../../utils/api";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./History.styles";
import Avatar from "../../../assets/images/avatar.svg";
import BackIcon from "../../../assets/icons/back.svg";
import Thermometer from "../../components/Thermometer/Thermometer";
import { SummaryResponse } from "../../types/thermometer";
import { MarkedDates } from "../../types/thermometer";

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
  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [temperatureValue, setTemperatureValue] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");
  const [loadingUsername, setLoadingUsername] = useState<boolean>(true);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [dailySummaries, setDailySummaries] = useState<
    { date: string; temperature: number }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getMarkColor = (temp: number): string => {
    if (temp < 16.5) return "#84AFD5";
    if (temp < 24.5) return "#BE86B8";
    if (temp < 32.5) return "#96CA76";
    if (temp < 40.5) return "#F3B4A2";
    return "#F1A85C";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<any>("/api/member/me");
        const nick = res.data.data?.nickname ?? (res.data as any).nickname;
        if (nick) setUsername(nick);
      } catch (err) {
        console.warn("프로필 조회 실패:", err);
      } finally {
        setLoadingUsername(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await api.get<SummaryResponse>(
          "/api/emotion-temperature/summary",
          { params: { month: currentMonth } }
        );
        const { monthlyTemperature, dailySummaries } = res.data.data;
        setTemperatureValue(
          monthlyTemperature === 0 ? 36.5 : monthlyTemperature
        );

        const marks: MarkedDates = {};
        dailySummaries.forEach(({ date, temperature }) => {
          marks[date] = {
            startingDay: true,
            endingDay: true,
            color: getMarkColor(temperature),
            textColor: "#000",
          };
        });
        setMarkedDates(marks);
        setDailySummaries(dailySummaries);
        setSelectedDate(null);
      } catch (err) {
        Alert.alert("오류", `${currentMonth} 데이터를 불러오지 못했습니다.`);
      }
    };
    fetchSummaries();
  }, [currentMonth]);

  const onMonthChange = ({ year, month }: { year: number; month: number }) => {
    const m = month < 10 ? `0${month}` : `${month}`;
    setCurrentMonth(`${year}-${m}`);
  };

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
            <Text style={styles.username}>
              {loadingUsername ? "로딩 중..." : `${username}님`}
            </Text>
            <Text style={styles.temperatureLabel}>
              온도 {temperatureValue != null ? `${temperatureValue}℃` : "..."}
            </Text>
            {temperatureValue != null && (
              <Thermometer temperature={temperatureValue} />
            )}
          </View>
        </View>
      </View>

      <View style={styles.monthlySection}>
        <Text style={styles.monthlyTitle}>월간기록</Text>
        <View style={styles.calendar}>
          <Calendar
            current={`${currentMonth}-01`}
            markingType="period"
            markedDates={markedDates}
            onMonthChange={onMonthChange}
            onDayPress={({ dateString }) =>
              setSelectedDate(markedDates[dateString] ? dateString : null)
            }
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
        {selectedDate && (
          <View
            style={{
              backgroundColor: getMarkColor(
                dailySummaries.find((d) => d.date === selectedDate)
                  ?.temperature ?? 0
              ),
              marginTop: 12,
              padding: 16,
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {selectedDate.replace(/-/g, ".")}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {dailySummaries.find((d) => d.date === selectedDate)
                ?.temperature ?? "-"}
              ℃
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default History;
