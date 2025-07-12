import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./EmotionResult.styles";
import type { AnalysisData } from "../../types/analysis";
import CharacterHappy from "../../../assets/images/happy.svg";
import CharacterSurprised from "../../../assets/images/surprised.svg";
import CharacterSad from "../../../assets/images/sad.svg";
import CharacterAngry from "../../../assets/images/angry.svg";
import CharacterFearful from "../../../assets/images/scary.svg";
import CharacterDisgust from "../../../assets/images/hate.svg";
import CharacterDefault from "../../../assets/images/character1.svg";
import type { EmotionResultNavProp } from "../../types/navigation";

const characterMap = {
  행복: CharacterHappy,
  놀람: CharacterSurprised,
  슬픔: CharacterSad,
  분노: CharacterAngry,
  공포: CharacterFearful,
  혐오: CharacterDisgust,
};

const EmotionResult = () => {
  const navigation = useNavigation<EmotionResultNavProp>();
  const route = useRoute<EmotionResultNavProp>();
  const result = route.params?.result as AnalysisData;

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>결과를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const { nickname, emotion: rawEmotion, causes, message } = result;

  useEffect(() => {
    console.log("▶ rawEmotion:", rawEmotion);
  }, [rawEmotion]);

  const key = rawEmotion.split("(")[0].trim();
  const CharacterComponent = characterMap[key] ?? CharacterDefault;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{nickname}의 감정 분석 결과</Text>

      <View style={styles.characterContainer}>
        <CharacterComponent style={styles.characterImage} />
      </View>

      <Text style={styles.emotion}>{rawEmotion}</Text>

      <View style={styles.tagsContainer}>
        {causes.map((tag, idx) => (
          <Text key={idx} style={styles.tag}>
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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MainTabs", {
            screen: "History",
            params: {
              screen: "Recommend",
              params: { emotion: rawEmotion, message },
            },
          })
        }
      >
        <Text style={styles.recommendation}>맞춤 추천 리스트 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmotionResult;
