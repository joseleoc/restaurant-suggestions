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
        gap: 5,
        justifyContent: "space-between",
        paddingBottom: 5,
        padding: 8,
        width: "100%",
        height: "60%",
    },
    actions: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",

    },
    priceLabel: {
        fontWeight: "bold",
    },
});
