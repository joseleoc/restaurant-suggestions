import { Dimensions, StyleSheet } from "react-native";

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
    maxHeight: Dimensions.get("screen").height / 2,
  },
  formContainer: {
    gap: 16,
    alignContent: "center",
    maxHeight: Dimensions.get("screen").height / 2 - 100,
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: -10,
    top: -70,
  },
  nextButton: {
    alignSelf: "flex-end",
    borderRadius: 5,
    marginBottom: 20,
  },
  loader: {
    borderRadius: 5,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  allergiesListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
