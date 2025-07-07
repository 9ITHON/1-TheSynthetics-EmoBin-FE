import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  backArrow: {
    marginHorizontal: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  noticeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  firstTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  noticeContentRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  importantIcon: {
    marginRight: 8,
    marginTop: 2,
  },

  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 20,
    flex: 1,
  },
  normalText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#333",
    lineHeight: 20,
    flexShrink: 1,
  },

  noticeDate: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
});
