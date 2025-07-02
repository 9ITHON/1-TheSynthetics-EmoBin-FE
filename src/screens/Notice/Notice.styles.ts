import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EC",
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
  noticeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  noticeHeader: {
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noticeSubtitle: {
    fontSize: 12,
    color: "#e74c3c",
  },
  noticeContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  noticeContentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  importantIcon: {
    marginRight: 8,
  },
  noticeDate: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
});
