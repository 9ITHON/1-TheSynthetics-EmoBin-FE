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
import api from "../../utils/api";
import { styles } from "./UserInfo.styles";
import BackIcon from "../../../assets/icons/back.svg";
import Pencil from "../../../assets/icons/pencil.svg";
import ForwardIcon from "../../../assets/icons/forward.svg";
import { RootStackParamList } from "../../types/navigation";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal"; 
import logoutApi from "../../api/Logout_api"; 
import withdrawalApi from "../../api/Deletemember_api"; 
import { useAuthStore } from "../../stores/authStore"; 
import { useTokenStore } from "../../stores/tokenStore"; 
import { clearTokens as clearSecureStoreTokens } from "../../utils/tokenStorage"; 

const UserInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [isWithdrawalModalVisible, setWithdrawalModalVisible] = useState<boolean>(false);

  const authStoreLogout = useAuthStore((state) => state.logout);
  const { refreshToken } = useTokenStore.getState();
  const clearTokenStore = useTokenStore((state) => state.clear);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<any>("/api/member/me");
        const profile = res.data.data ?? res.data;
        const nickname: string = profile.nickname ?? "";
        setUsername(nickname);
        const rawBirth: string = profile.birthdate ?? profile.birth ?? "";
        setBirthDate(rawBirth.replace(/-/g, "."));
        const rawGender: string = (profile.gender ?? "").toString();
        let displayGender = rawGender;
        if (
          rawGender.toUpperCase() === "MALE" ||
          rawGender.toLowerCase() === "male"
        ) {
          displayGender = "남성";
        } else if (
          rawGender.toUpperCase() === "FEMALE" ||
          rawGender.toLowerCase() === "female"
        ) {
          displayGender = "여성";
        }
        setGender(displayGender);
      } catch (err: any) {
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
      Alert.alert("오류", "닉네임 수정에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    if (!refreshToken) {
      Alert.alert("오류", "로그아웃에 필요한 정보가 없습니다.");
      return;
    }
    try {
      await logoutApi(refreshToken);
      await authStoreLogout(); 
      await clearTokenStore(); 
      await clearSecureStoreTokens(); 
      Alert.alert("알림", "로그아웃 되었습니다.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Alert.alert("오류", "로그아웃에 실패했습니다.");
    }
  };

  const handleWithdrawal = async () => {
    setWithdrawalModalVisible(false);
    if (!refreshToken) {
      Alert.alert("오류", "회원 탈퇴에 필요한 정보가 없습니다.");
      return;
    }
    try {
      await withdrawalApi(refreshToken);
      await authStoreLogout(); 
      await clearTokenStore(); 
      await clearSecureStoreTokens(); 
      Alert.alert("알림", "회원 탈퇴가 완료되었습니다.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      Alert.alert("오류", "회원 탈퇴에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

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
        <TouchableOpacity>
          <Text style={styles.infoValue}>{birthDate}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: "relative" }}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          <TouchableOpacity>
            <Text style={styles.infoValue}>{gender}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        <Text style={styles.logoutText}>|</Text>

        <TouchableOpacity onPress={() => setWithdrawalModalVisible(true)}>
          <Text style={styles.logoutText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal
        isVisible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        title="로그아웃"
        message="로그아웃 하시겠습니까?"
        onConfirm={handleLogout}
      />

      <ConfirmationModal
        isVisible={isWithdrawalModalVisible}
        onClose={() => setWithdrawalModalVisible(false)}
        title="회원 탈퇴"
        message="회원탈퇴 하시겠습니까?"
        onConfirm={handleWithdrawal}
      />
    </View>
  );
};

export default UserInfo;
