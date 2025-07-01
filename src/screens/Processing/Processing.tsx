import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./Processing.styles";
import { useEffect } from "react";

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
        <Image
          source={require("../../../assets/images/character1.png")}
          style={styles.characterImage}
          resizeMode="contain"
        />
        <Image
          source={require("../../../assets/images/shadow.png")}
          style={styles.shadowImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Processing;
