import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    fontSize: 64,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 24,
    color: "#014441",
  },
  content: {
    alignItems: "center",
  },
  icon: {
    width: 200,
    height: 200,
  },
  disclaimerContainer: {
    alignItems: "center",
  },
  disclaimer: {
    textAlign: "center",
    color: "#014441",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    borderColor: "#000",
    borderWidth: 1,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: "#014441",
    fontSize: 22,
  },
});
