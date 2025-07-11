import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Calendar, LocaleConfig } from "react-native-calendars";
import axios from "axios";
import api from "../../utils/api";
import { styles } from "./UserInfo.styles";
import BackIcon from "../../../assets/icons/back.svg";
import Pencil from "../../../assets/icons/pencil.svg";
import ForwardIcon from "../../../assets/icons/forward.svg";
import { RootStackParamList } from "../../types/navigation";

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

const UserInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isGenderDropdownVisible, setGenderDropdownVisible] =
    useState<boolean>(false);
  const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<any>("/api/member/me");
        const profile = res.data.data ?? res.data;
        setUsername(profile.nickname ?? "");
        setBirthDate((profile.birth ?? "").replace(/-/g, "."));
        setGender(profile.gender ?? "");
      } catch (err: any) {
        console.error("프로필 조회 실패:", err);
        Alert.alert("오류", "프로필 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const updateNickname = async (newNickname: string) => {
    try {
      await api.put("/api/member/me", { nickname: newNickname });
      Alert.alert("알림", "닉네임이 성공적으로 변경되었습니다.");
    } catch (err: any) {
      console.error("닉네임 수정 실패:", err);
      Alert.alert("오류", "닉네임 수정에 실패했습니다.");
    }
  };

  const handleSelectDate = (day: { dateString: string }) => {
    setBirthDate(day.dateString.replace(/-/g, "."));
    setCalendarVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

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
                onBlur={() => {
                  setIsEditing(false);
                  updateNickname(username);
                }}
                onSubmitEditing={() => {
                  setIsEditing(false);
                  updateNickname(username);
                }}
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
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Text style={styles.infoValue}>{birthDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ position: "relative" }}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>성별</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setGenderDropdownVisible((prev) => !prev);
              }}
            >
              <Text style={styles.infoValue}>
                {gender} <Pencil width={15} />
              </Text>
            </TouchableOpacity>
          </View>
          {isGenderDropdownVisible && (
            <View style={styles.genderDropdown}>
              <TouchableOpacity onPress={() => setGender("남자")}>
                <Text style={styles.dropdownItem}>남자</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender("여자")}>
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
                hideExtraDays
                monthFormat="yyyy년 M월"
                renderArrow={(dir) =>
                  dir === "left" ? (
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
                  textSectionTitleColor: "rgba(138,138,138,1)",
                  arrowColor: "#333",
                }}
              />
              <TouchableOpacity
                onPress={() => setCalendarVisible(false)}
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
