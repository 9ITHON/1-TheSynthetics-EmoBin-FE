import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 40,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  backArrow: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  temperatureCard: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  cardContent: {
    backgroundColor: "#F5D85C",
    borderRadius: 20,
    padding: 20,
    paddingTop: 40,
    position: "relative",
    marginTop: 20,
  },
  avatarWrapper: {
    position: "absolute",
    top: -25,
    left: 20,
    zIndex: 10,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F5D85C",
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
  temperatureInfo: {
    alignItems: "flex-start",
  },
  temperatureLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  temperatureImage: {
    width: "100%",
    height: 40,
  },
  monthlySection: {
    marginHorizontal: 20,
  },
  monthlyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  calendar: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#FFF",
    padding: 10,
  },
});
