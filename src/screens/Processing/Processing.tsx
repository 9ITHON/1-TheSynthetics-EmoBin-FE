import { View, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./Processing.styles";
import { useEffect } from "react";
import axios from "axios";
import Character2 from "../../../assets/images/character2.svg";
import Shadow from "../../../assets/images/shadow.svg";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MiLCJqdGkiOiJiZWQyYTE2ZC0wZjY3LTRiMjQtODFjZi1lNTA4Y2NlMWVmNTQiLCJtZW1iZXJJZCI6MSwiaWF0IjoxNzUyMjA3NzUxLCJleHAiOjE3NTIyMDk1NTF9.6ohAaxREzfd0DsSj-3lq_ac1NAPF1PDft30Z1nPqrvc";

const BASE_URL = "http://52.64.128.49:8080";

const Processing = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { noteText } = route.params;

  useEffect(() => {
    const analyze = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/analysis`,
          { text: noteText },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = response.data;
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
