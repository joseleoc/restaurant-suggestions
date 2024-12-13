import { Dimensions, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        borderRadius: 30,
        width: Dimensions.get("window").width / 3,
        maxWidth: 200,
        overflow: "hidden",
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
        padding: 8,
        paddingBottom: 15
    },
});
