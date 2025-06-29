import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./UserInfo.styles";

const UserInfo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>회원정보</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.profileText}>
          <Text style={styles.username}>아이디</Text>
          <Text style={styles.subtext}>아이디 수정 ✏️</Text>
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
      <View style={styles.menuItem}>
        <Text style={styles.menuTitle}>진행 상황</Text>
        <Text style={styles.arrow}>{">"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>생년월일</Text>
        <Text style={styles.infoValue}>1993.10.25</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>성별</Text>
        <Text style={styles.infoValue}>정보없음 ✏️</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.logoutSection}>
        <Text style={styles.logoutText}>로그아웃 | 회원탈퇴</Text>
      </View>
    </View>
  );
};

export default UserInfo;
