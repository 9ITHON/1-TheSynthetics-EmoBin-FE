import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./History.styles";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Avatar from "../../../assets/images/avatar.svg";
import BackIcon from "../../../assets/icons/back.svg";
import Thermometer from "../../components/Thermometer";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
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

  const temperatureValue = 55.5;

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
              온도 {temperatureValue}℃
            </Text>
            <Thermometer temperature={temperatureValue} />
          </View>
        </View>
      </View>

      <View style={styles.monthlySection}>
        <Text style={styles.monthlyTitle}>월간기록</Text>
        <View style={styles.calendar}>
          <Calendar
            current={"2024-06-01"}
            markingType="period"
            markedDates={{
              "2024-06-01": {
                startingDay: true,
                endingDay: true,
                color: "#F5D85C",
                textColor: "#000",
              },
              "2024-06-06": {
                startingDay: true,
                color: "#F5D85C",
                textColor: "#000",
              },
              "2024-06-07": { color: "#F5D85C", textColor: "#000" },
              "2024-06-08": {
                endingDay: true,
                color: "#F5D85C",
                textColor: "#000",
              },
            }}
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
