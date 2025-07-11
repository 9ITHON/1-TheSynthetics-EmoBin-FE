import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Landing.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";
import { useTokenStore } from "../../stores/tokenStore";
import NotificationIcon from "../../../assets/icons/notification.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import Character1 from "../../../assets/images/character1.svg";
import Shadow from "../../../assets/images/shadow.svg";

const Landing = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { accessToken, refreshToken } = useTokenStore.getState();
    console.log("Landing Screen - Access Token:", accessToken);
    console.log("Landing Screen - Refresh Token:", refreshToken);

    const fetchProfile = async () => {
      try {
        const res = await api.get<{
          code: string;
          data?: { nickname: string };
          nickname?: string;
        }>("/api/member/me");
        console.log("프로필 응답 전체:", res.data);

        const nickname = res.data.data?.nickname ?? (res.data as any).nickname;
        if (nickname) {
          setUsername(nickname);
        } else {
          console.warn("프로필 응답에서 nickname을 찾을 수 없습니다.");
        }
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          console.log("프로필 조회 에러 status:", err.response.status);
          console.log("프로필 조회 에러 data:", err.response.data);
        } else {
          console.log("Unexpected error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const timer = setTimeout(() => {
      navigation.navigate("WriteNote");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MenuIcon width={24} height={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <NotificationIcon width={24} height={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.username}>
          {loading ? "로딩 중..." : `${username}님`}
        </Text>
        <Text style={styles.question}>오늘은 어떤 하루였나요?</Text>
      </View>

      <View style={styles.characterContainer}>
        <Character1 style={styles.characterImage} />
        <Shadow style={styles.shadowImage} />
      </View>
    </View>
  );
};

export default Landing;
