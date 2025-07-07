import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 60,
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
    marginTop: 160,
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  characterContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
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
