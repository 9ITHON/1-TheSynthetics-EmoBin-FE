import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./Landing.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useEffect } from "react";

const Landing = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("5초 후 WriteNote로 이동합니다");
      navigation.navigate("WriteNote");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/icons/notification.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/icons/menu.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.username}>ㅇㅇ님</Text>
        <Text style={styles.question}>오늘은 어떤 하루였나요?</Text>
      </View>

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

export default Landing;
