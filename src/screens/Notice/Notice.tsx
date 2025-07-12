import { View, Text, FlatList, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { styles } from "./Notice.styles";
import ImportantIcon from "../../../assets/icons/important.svg";
import BackIcon from "../../../assets/icons/back.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import { useState } from "react";

const HIGHLIGHT = "캘린더 앱 ‘전체접근’이 필요합니다.";
const notices = [
  {
    id: "1",
    title: "캘린더 설정",
    subtitle: HIGHLIGHT,
    date: "2024. 11. 4.",
  },
  {
    id: "2",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다.\n5.8.21로 업데이트하시면 이용하실 수 있습니다.\n앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
  {
    id: "3",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다.\n5.8.21로 업데이트하시면 이용하실 수 있습니다.\n앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
  {
    id: "4",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다.\n5.8.21로 업데이트하시면 이용하실 수 있습니다.\n앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
  {
    id: "5",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다.\n5.8.21로 업데이트하시면 이용하실 수 있습니다.\n앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
  {
    id: "6",
    content:
      "많은 분들의 의견이 반영되어 설정 > 화면> 달력 안의 목록에서 표시할 카테고리 옵션이 추가되었습니다.\n5.8.21로 업데이트하시면 이용하실 수 있습니다.\n앞으로도 많은 분들의 좋은 의견 부탁드립니다. 감사합니다.",
    date: "2024. 11. 4.",
  },
];

const Notice = () => {
  const navigation = useNavigation();
  const [helpVisible, setHelpVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon width={24} height={24} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>공지사항</Text>
        </View>
        <TouchableOpacity onPress={() => setHelpVisible(true)}>
          <HelpIcon width={24} height={24} style={styles.helpIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) =>
          item.id === "1" ? (
            <View style={styles.noticeCard}>
              <Text style={styles.firstTitle}>{item.title}</Text>
              <View style={styles.noticeContentRow}>
                <ImportantIcon
                  width={20}
                  height={20}
                  style={styles.importantIcon}
                />
                <Text style={styles.normalText}>{item.subtitle}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.noticeCard}>
              <View style={styles.noticeContentRow}>
                <Text style={styles.boldText}>{item.content}</Text>
              </View>
              <Text style={styles.noticeDate}>{item.date}</Text>
            </View>
          )
        }
      />

      <Modal
        visible={helpVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setHelpVisible(false)}
      >
        <View style={styles.helpModalOverlay}>
          <View style={styles.helpModalContainer}>
            <TouchableOpacity
              style={styles.helpCloseIcon}
              onPress={() => setHelpVisible(false)}
            >
              <BackIcon width={20} height={20} />
            </TouchableOpacity>
            <Text style={styles.helpTitle}>고객센터</Text>
            <Text style={styles.helpEmail}>sprisunny12@gmail.com</Text>
            <Text style={styles.helpEmailText}>이메일로 문의하기</Text>

            <TouchableOpacity
              style={styles.helpCloseButton}
              onPress={() => setHelpVisible(false)}
            ></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notice;
