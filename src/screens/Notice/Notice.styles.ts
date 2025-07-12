import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 60,
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
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  firstTitle: {
    fontSize: 18,
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
  helpIcon: {
    marginHorizontal: 8,
  },

  helpModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  helpModalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  helpEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  helpEmailText: {
    borderTopWidth: 0.5,
    width: "100%",
    textAlign: "center",
    paddingTop: 10,
  },
  helpButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
    alignItems: "center",
    marginBottom: 12,
  },
  helpButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  helpCloseButton: {
    paddingVertical: 8,
  },
  helpCloseIcon: {
    position: "absolute",
    top: 24,
    left: 12,
    zIndex: 10,
  },
  helpCloseText: {
    fontSize: 14,
    color: "#007AFF",
  },
});
