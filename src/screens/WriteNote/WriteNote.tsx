import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./WriteNote.styles";

const WriteNote = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Image
            source={require("../../../assets/icons/notification.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.noteContainer}>
        <Image
          source={require("../../../assets/images/note.png")}
          style={styles.noteImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>작성완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WriteNote;
