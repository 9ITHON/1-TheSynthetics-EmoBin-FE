import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";
import NotificationIcon from "../../../assets/icons/notification.svg";
import { styles } from "./WriteNote.styles";

const WriteNote = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [noteText, setNoteText] = useState("");

  const handleSubmit = () => {
    if (!noteText.trim()) {
      Alert.alert("텍스트를 입력해주세요.");
      return;
    }

    navigation.navigate("Processing", { noteText });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.noteContainer}>
          <Image
            source={require("../../../assets/images/note.png")}
            style={styles.noteImage}
          />

          <TouchableOpacity style={styles.textInputWrapper} activeOpacity={1}>
            <TextInput
              style={styles.textInput}
              placeholder="여기에 입력하세요..."
              placeholderTextColor="#aaa"
              multiline
              value={noteText}
              onChangeText={setNoteText}
              textAlignVertical="top"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>작성완료</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WriteNote;
