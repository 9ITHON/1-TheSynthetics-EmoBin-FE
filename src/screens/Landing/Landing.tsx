import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./Landing.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useEffect } from "react";
import NotificationIcon from "../../../assets/icons/notification.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import Character1 from "../../../assets/images/character1.svg";
import Shadow from "../../../assets/images/shadow.svg";

const Landing = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
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
        <Text style={styles.username}>ㅇㅇ님</Text>
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
