import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { styles } from "./UserInfo.styles";
import BackIcon from "../../../assets/icons/back.svg";
import Pencil from "../../../assets/icons/pencil.svg";

const UserInfo = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("민주콩");
  const [isEditing, setIsEditing] = useState(false);

  const [birthDate, setBirthDate] = useState("1993.10.25");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [gender, setGender] = useState("정보없음");

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const formatted = format(date, "yyyy.MM.dd");
    setBirthDate(formatted);
    hideDatePicker();
  };

  const toggleGender = () => {
    setGender((prev) =>
      prev === "정보없음" ? "남자" : prev === "남자" ? "여자" : "정보없음"
    );
  };

  return (
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
        <Text style={styles.arrow}>{">"}</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuTitle}>마케팅 수신 동의</Text>
        <Text style={styles.arrow}>{">"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>생년월일</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.infoValue}>{birthDate}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>성별</Text>
        <TouchableOpacity onPress={toggleGender}>
          <Text style={styles.infoValue}>
            {gender} <Pencil width={15} />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.logoutSection}>
        <Text style={styles.logoutText}>로그아웃 | 회원탈퇴</Text>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default UserInfo;
