import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionDescription: {
    fontSize: 12,
    color: "#666",
  },
  arrow: {
    fontSize: 18,
    color: "#666",
  },
});
