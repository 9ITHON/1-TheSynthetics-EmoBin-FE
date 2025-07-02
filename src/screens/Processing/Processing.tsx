import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./Processing.styles";
import { useEffect } from "react";
import Character1 from "../../../assets/images/character1.svg";
import Shadow from "../../../assets/images/shadow.svg";

const Processing = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("EmotionResult");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>감정 처리중</Text>

      <View style={styles.characterContainer}>
        <Character1 style={styles.characterImage} />
        <Shadow style={styles.shadowImage} />
      </View>
    </View>
  );
};

export default Processing;
