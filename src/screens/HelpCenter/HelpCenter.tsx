import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./HelpCenter.styles";
import BackIcon from "../../../assets/icons/back.svg";

const faqs = [
  {
    id: "1",
    question: "패드 - 폰 동기화가 안돼요.",
    answers: [
      "- 두 기기에서 모두 네트워크가 연결되어 있는지 확인해주세요.",
      "- 두 기기에서 모두 네트워크가 연결되어 있는지 확인해주세요.",
    ],
  },
  {
    id: "2",
    question: "다이어리 또는 속지가 사라져요.",
    answers: [
      "- 두 기기에서 모두 네트워크가 연결되어 있는지 확인해주세요.",
      "- 두 기기에서 모두 네트워크가 연결되어 있는지 확인해주세요.",
    ],
  },
];

const HelpCenter = () => {
  const navigation = useNavigation();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>고객센터</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.subtitle}>자주 묻는 질문을 확인하세요.</Text>

        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqContainer}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(faq.id)}
            >
              <Text style={styles.questionText}>
                {faq.id}. {faq.question}
              </Text>
              <Text style={styles.arrow}>
                {expandedIds.includes(faq.id) ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {expandedIds.includes(faq.id) && (
              <View style={styles.answerContainer}>
                {faq.answers.map((answer, idx) => (
                  <Text key={idx} style={styles.answerText}>
                    {answer}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.emailButton}>
          <Text style={styles.emailButtonText}>이메일로 문의하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HelpCenter;
