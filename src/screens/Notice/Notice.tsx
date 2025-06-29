import { View, Text, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { styles } from "./Notice.styles";

const notices = [
  {
    id: "1",
    content: "캘린더 설정 \n캘린더 앱 ‘전체접근’이 필요합니다.",
    date: "2024. 11. 4.",
  },
  {
    id: "2",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다. 5.8.21로 업데이트하시면 이용하실 수 있습니다. 앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
  {
    id: "3",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다. 5.8.21로 업데이트하시면 이용하실 수 있습니다. 앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
];

const Notice = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>공지사항</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noticeCard}>
            <Text style={styles.noticeContent}>{item.content}</Text>
            <Text style={styles.noticeDate}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Notice;
