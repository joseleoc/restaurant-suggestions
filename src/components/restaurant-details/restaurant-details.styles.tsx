import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  imageContainer: {
    height: 150,
    width: "100%",
  },
  backImage: {
    height: 150,
    width: Dimensions.get("window").width,
  },
  image: {
    position: "absolute",
    bottom: -30,
    left: Dimensions.get("window").width / 2 - 130 / 2,
    height: 130,
    width: 130,
  },
  sectionContainer: {
    marginTop: 35,
    justifyContent: "center",
    gap: 10,
    flex: 1,
    width: Dimensions.get("window").width,
    marginBottom: 20,
  },
  restaurantName: {
    fontWeight: "bold",
    textAlign: "center",
  },
  restaurantDescription: {
    textAlign: "center",
    fontWeight: "semibold",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  restaurantAddress: {
    textAlign: "center",
  },
});
