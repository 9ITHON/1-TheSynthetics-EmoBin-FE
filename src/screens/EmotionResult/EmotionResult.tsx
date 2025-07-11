import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./EmotionResult.styles";
import Character1 from "../../../assets/images/character1.svg";
import Shadow from "../../../assets/images/shadow.svg";
import { AnalysisData } from "../../types/analysis";

const EmotionResult = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<{ params: { result?: AnalysisData } }>();
  const result = route.params?.result;

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>결과를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const { nickname, emotion, causes, message } = result;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{nickname}의 감정 분석 결과</Text>

      <View style={styles.characterContainer}>
        <Character1 style={styles.characterImage} />
        <Shadow style={styles.shadowImage} />
      </View>

      <Text style={styles.emotion}>{emotion}</Text>

      <View style={styles.tagsContainer}>
        {causes.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            <Text style={styles.tagHash}>#</Text>
            <Text style={styles.tagText}> {tag}</Text>
          </Text>
        ))}
      </View>

      <View style={styles.analysisBox}>
        <Text style={styles.analysisText}>
          {message.split("\n").map((line, idx) => (
            <Text key={idx}>
              {line}
              {"\n"}
            </Text>
          ))}
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <Text style={styles.recommendation}>맞춤 추천 리스트 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmotionResult;
