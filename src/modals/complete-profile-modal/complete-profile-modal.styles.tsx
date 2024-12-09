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
  formContainer: {
    borderRadius: 15,
    paddingHorizontal: 32,
    paddingVertical: 40,
    gap: 16,
    alignContent: "center",
    justifyContent: "center",
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 5,
  },
});
