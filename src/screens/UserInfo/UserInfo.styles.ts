import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFD700",
    marginRight: 12,
  },
  profileText: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  usernameInput: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
  },
  editButton: {
    marginTop: 4,
  },
  subtext: {
    fontSize: 12,
    color: "#666",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    position: "relative",
  },
  infoLabel: {
    fontSize: 14,
    color: "#555",
  },
  infoValue: {
    fontSize: 14,
    color: "#000",
  },
  logoutSection: {
    marginTop: 40,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 14,
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
    zIndex: -1,
  },
  arrow: {
    fontSize: 18,
    color: "#666",
  },
  genderDropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    width: 120,
    zIndex: 10,
    elevation: 10,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 14,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
