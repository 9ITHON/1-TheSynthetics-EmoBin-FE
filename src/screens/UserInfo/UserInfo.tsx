import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { styles } from "./UserInfo.styles";
import BackIcon from "../../../assets/icons/back.svg";
import Pencil from "../../../assets/icons/pencil.svg";
import ForwardIcon from "../../../assets/icons/forward.svg";
import { LocaleConfig } from "react-native-calendars";

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

const UserInfo = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("민주콩");
  const [isEditing, setIsEditing] = useState(false);

  const [birthDate, setBirthDate] = useState("1993.10.25");
  const [gender, setGender] = useState("선택안함");
  const [isGenderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const showCalendar = () => setCalendarVisible(true);
  const hideCalendar = () => setCalendarVisible(false);

  const selectGender = (value: string) => {
    setGender(value);
    setGenderDropdownVisible(false);
  };

  const handleSelectDate = (day: { dateString: string }) => {
    const formatted = day.dateString.replace(/-/g, ".");
    setBirthDate(formatted);
    setCalendarVisible(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => setGenderDropdownVisible(false)}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>회원정보</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.profileText}>
            {isEditing ? (
              <TextInput
                style={styles.usernameInput}
                value={username}
                onChangeText={setUsername}
                onBlur={() => setIsEditing(false)}
                onSubmitEditing={() => setIsEditing(false)}
                autoFocus
                returnKeyType="done"
              />
            ) : (
              <Text style={styles.username}>{username}</Text>
            )}
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            >
              <Text style={styles.subtext}>
                아이디 수정 <Pencil width={15} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuItem}>
          <Text style={styles.menuTitle}>개인정보 이용 약관</Text>
          <ForwardIcon width={16} height={16} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuTitle}>마케팅 수신 동의</Text>
          <ForwardIcon width={16} height={16} />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          <TouchableOpacity onPress={showCalendar}>
            <Text style={styles.infoValue}>{birthDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ position: "relative" }}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>성별</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setGenderDropdownVisible(!isGenderDropdownVisible);
              }}
            >
              <Text style={styles.infoValue}>
                {gender} <Pencil width={15} />
              </Text>
            </TouchableOpacity>
          </View>
          {isGenderDropdownVisible && (
            <View style={styles.genderDropdown}>
              <TouchableOpacity onPress={() => selectGender("남자")}>
                <Text style={styles.dropdownItem}>남자</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectGender("여자")}>
                <Text style={styles.dropdownItem}>여자</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.divider} />
        </View>

        <View style={styles.logoutSection}>
          <Text style={styles.logoutText}>로그아웃 | 회원탈퇴</Text>
        </View>

        <Modal visible={isCalendarVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.calendarContainer}>
              <Calendar
                style={styles.calendar}
                onDayPress={handleSelectDate}
                current={birthDate.replace(/\./g, "-")}
                markedDates={{
                  [birthDate.replace(/\./g, "-")]: {
                    selected: true,
                    selectedColor: "#F5D85C",
                  },
                }}
                hideExtraDays={true}
                monthFormat={"yyyy년 M월"}
                onMonthChange={() => {}}
                renderArrow={(direction) =>
                  direction === "left" ? (
                    <BackIcon style={{ width: 20, height: 20 }} />
                  ) : (
                    <ForwardIcon style={{ width: 20, height: 20 }} />
                  )
                }
                theme={{
                  todayTextColor: "black",
                  textDayFontSize: 20,
                  textDayFontWeight: "bold",
                  textMonthFontSize: 20,
                  textMonthFontWeight: "bold",
                  textSectionTitleColor: "rgba(138, 138, 138, 1)",
                  arrowColor: "#333",
                }}
              />
              <TouchableOpacity
                onPress={hideCalendar}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserInfo;
