import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    position: "absolute",
    top: -100,
    left: 0,
    right: 0,
    marginTop: 40,
    fontWeight: "bold",
  },
  container: {
    padding: 40,
  },
  card: {
    borderRadius: 15,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  formContainer: {
    gap: 16,
    alignContent: "center",
    justifyContent: "center",
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 5,
  },
  backButton: {
    position: "absolute",
    left: -30,
    top: -40,
  },
});
