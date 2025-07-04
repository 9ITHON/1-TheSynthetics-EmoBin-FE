import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import NotificationIcon from "../../../assets/icons/notification.svg";
import Note from "../../../assets/images/note.svg";
import { styles } from "./WriteNote.styles";

const WriteNote = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [noteText, setNoteText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <NotificationIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.noteContainer}>
        <Note style={styles.noteImage} />
        <TouchableOpacity style={styles.textInputWrapper} activeOpacity={1}>
          <TextInput
            style={styles.textInput}
            placeholder="여기에 입력하세요..."
            placeholderTextColor="#aaa"
            multiline
            value={noteText}
            onChangeText={setNoteText}
          />
        </TouchableOpacity>
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
