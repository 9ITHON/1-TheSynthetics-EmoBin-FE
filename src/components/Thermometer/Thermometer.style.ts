import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  thermometer: {
    width: 300,
    height: 40,
    borderColor: "#333",
    borderWidth: 4,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  fill: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 20,
  },
  tick: {
    position: "absolute",
    width: 1,
    height: 20,
    backgroundColor: "#333",
    top: 10,
  },
});
