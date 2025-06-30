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
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  greetingContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  characterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  characterImage: {
    width: 200,
    height: 200,
  },
  shadowImage: {
    width: 200,
    height: 50,
    marginTop: -20,
  },
});
