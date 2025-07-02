import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./EmotionResult.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import Character1 from "../../../assets/images/character1.svg";
import Shadow from "../../../assets/images/shadow.svg";

const EmotionResult = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ㅇㅇ의 감정 분석 결과</Text>

      <View style={styles.characterContainer}>
        <Character1 style={styles.characterImage} />
        <Shadow style={styles.shadowImage} />
      </View>

      <Text style={styles.emotion}>슬픔</Text>

      <View style={styles.tagsContainer}>
        <Text style={styles.tag}># 자존감</Text>
        <Text style={styles.tag}># 인간관계</Text>
        <Text style={styles.tag}># 인간관계</Text>
      </View>

      <View style={styles.analysisBox}>
        <Text style={styles.analysisText}>
          그런일이 있었구나{"\n"}이런 부분에서 너의 감정이{"\n"}많이 안 좋을 거
          같네
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <Text style={styles.recommendation}>맞춤 추천 리스트 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmotionResult;
