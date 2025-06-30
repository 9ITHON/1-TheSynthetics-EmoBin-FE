import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  noteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noteImage: {
    width: "100%",
    aspectRatio: 0.7,
  },
  submitButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
