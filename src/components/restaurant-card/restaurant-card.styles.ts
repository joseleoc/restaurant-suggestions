import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        borderRadius: 30,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
    },
    backImage: {
        width: "100%",
        position: "absolute",
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    image: {
        width: "100%",
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        fontWeight: "bold",
    },
    content: {
      width: "100%",
      paddingHorizontal: 20,
      padding: 8,
        paddingBottom: 15,
    },
});
