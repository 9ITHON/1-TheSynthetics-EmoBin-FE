import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./WriteNote.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import NotificationIcon from "../../../assets/icons/notification.svg";

const WriteNote = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <NotificationIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.noteContainer}>
        <Image
          source={require("../../../assets/images/note.png")}
          style={styles.noteImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("Processing")}
      >
        <Text style={styles.submitButtonText}>작성완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WriteNote;
