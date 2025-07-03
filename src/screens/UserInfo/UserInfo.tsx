import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { styles } from "./UserInfo.styles";
import BackIcon from "../../../assets/icons/back.svg";
import Pencil from "../../../assets/icons/pencil.svg";
import ForwardIcon from "../../../assets/icons/forward.svg";

const UserInfo = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("민주콩");
  const [isEditing, setIsEditing] = useState(false);

  const [birthDate, setBirthDate] = useState("1993.10.25");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [gender, setGender] = useState("선택안함");
  const [isGenderDropdownVisible, setGenderDropdownVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const formatted = format(date, "yyyy.MM.dd");
    setBirthDate(formatted);
    hideDatePicker();
  };

  const selectGender = (value: string) => {
    setGender(value);
    setGenderDropdownVisible(false);
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
          <TouchableOpacity onPress={showDatePicker}>
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

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserInfo;
