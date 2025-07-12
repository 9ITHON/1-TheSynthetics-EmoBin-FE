import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const POSTER_WIDTH = width * 0.75;
export const POSTER_SPACING = 16;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#333",
  },
  category: {
    fontSize: 16,
    marginBottom: "5%",
    fontWeight: "bold",
    color: "#666",
    marginTop: "20%",
  },
  poster: {
    height: POSTER_WIDTH * 1.6,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
});
