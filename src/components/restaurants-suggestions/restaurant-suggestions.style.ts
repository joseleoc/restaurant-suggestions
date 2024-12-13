import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 5
    },
    title: {
        fontWeight: "bold",
        marginHorizontal: 16
    },
    scrollContainer: {
        flexDirection: "row",
        overflow: "scroll",
        justifyContent: "center",
        paddingStart: 10,
        paddingVertical: 10
    },
    scrollView: {
        overflowX: "visible",

    },
    scrollViewContent: {
        overflowX: "visible",
        padding: 4,
        gap: 16
    },
});
