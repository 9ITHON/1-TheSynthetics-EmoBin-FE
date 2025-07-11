import { View, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./Processing.styles";
import { useEffect } from "react";
import api from "../../utils/api";
import Character2 from "../../../assets/images/character2.svg";
import Shadow from "../../../assets/images/shadow.svg";
import { AnalysisResponse } from "../../types/analysis";

const Processing = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { noteText } = route.params;

  useEffect(() => {
    const analyze = async () => {
      try {
        const response = await api.post<AnalysisResponse>("/api/analysis", {
          text: noteText,
        });

        const result = response.data.data;
        navigation.replace("EmotionResult", { result });
      } catch (error: any) {
        Alert.alert(
          "분석에 실패했습니다",
          error?.response?.data?.message || "알 수 없는 오류"
        );
        navigation.goBack();
      }
    };

    analyze();
  }, [noteText, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>감정 처리중</Text>

      <View style={styles.characterContainer}>
        <Character2 style={styles.characterImage} />
        <Shadow style={styles.shadowImage} />
      </View>
    </View>
  );
};

export default Processing;
