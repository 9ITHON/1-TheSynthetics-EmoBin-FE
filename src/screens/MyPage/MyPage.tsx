import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import { MyPageOption } from "../../types/myPage";
import { styles } from "./MyPage.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import ForwardIcon from "../../../assets/icons/forward.svg";

const MyPage = () => {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const options: MyPageOption[] = [
    {
      title: "회원정보",
      description: "개인정보 수정이 가능합니다.",
      onPress: () => navigation.navigate("UserInfo"),
    },
    {
      title: "공지사항",
      onPress: () => navigation.navigate("Notice"),
    },
    {
      title: "고객센터",
      onPress: () => navigation.navigate("HelpCenter"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>마이페이지</Text>
      <View style={styles.contents}>
        <ToggleSwitch
          label="푸시알림설정"
          description="푸시 알림을 ON, OFF 하실 수 있습니다."
          value={isPushEnabled}
          onValueChange={setIsPushEnabled}
        />

        <FlatList
          data={options}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.onPress}
              style={styles.optionContainer}
            >
              <View>
                <Text style={styles.optionTitle}>{item.title}</Text>
                {item.description && (
                  <Text style={styles.optionDescription}>
                    {item.description}
                  </Text>
                )}
              </View>
              <ForwardIcon width={16} height={16} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default MyPage;
