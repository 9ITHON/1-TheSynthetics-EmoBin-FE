import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 60,
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
    position: "relative",
  },

  noteImage: {
    width: isWeb ? 400 : "160%",
    aspectRatio: 0.7,
    resizeMode: "contain",
  },

  textInputWrapper: {
    position: "absolute",
    width: isWeb ? 300 : "75%",
    top: isWeb ? 80 : 180,
    alignSelf: "center",
    justifyContent: "flex-start",
    minHeight: isWeb ? 390 : 80,
  },

  textInput: {
    fontSize: 12,
    height: isWeb ? 390 : 400,
    color: "#000",
    lineHeight: 27,
    textAlignVertical: "top",
    padding: 10,
    minHeight: isWeb ? 390 : 80,
    backgroundColor: "transparent",
    borderWidth: 0,
    ...(isWeb && {
      outlineStyle: "none",
      overflow: "hidden",
    }),
  },

  submitButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
    width: isWeb ? "20%" : "50%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  counterContainer: {
    alignItems: "flex-end",
  },
  counterText: {
    fontSize: 12,
    color: "#999",
  },
});
