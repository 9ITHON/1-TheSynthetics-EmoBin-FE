import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 24,
  },
  characterContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  characterImage: {
    width: 200,
    height: 200,
  },
  shadowImage: {
    width: 100,
    height: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  emotion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    fontSize: 14,
    color: "#F5B500",
    marginHorizontal: 4,
  },
  analysisBox: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  analysisText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  recommendation: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "underline",
  },
});
