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
  },
  contents: {
    width: "90%",
    margin: "auto",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  optionDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  arrow: {
    fontSize: 18,
    color: "#666",
  },
});
