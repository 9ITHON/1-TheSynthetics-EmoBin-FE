import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF1",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  backArrow: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  faqContainer: {
    marginBottom: 20,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 16,
  },
  answerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  answerText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  emailButton: {
    marginTop: 24,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
