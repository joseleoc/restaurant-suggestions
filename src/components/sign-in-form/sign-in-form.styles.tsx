import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
    paddingHorizontal: 64,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: { height: 64, borderRadius: 50, width: "100%" },
  button_text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  inputContainer: {},
  input: {},
  errorMessage: {
    height: 20,
    fontWeight: "semibold",
    paddingHorizontal: 8,
  },
});
