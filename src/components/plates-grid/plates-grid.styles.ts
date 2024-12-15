import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
    },
    contentContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    rowContainer: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
    },
    link: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },

    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        overflow: "hidden",
        marginVertical: 15,
        borderRadius: 20,
        paddingBottom: 10,
        flex: 1,
        width: "100%",
    },
    cardImage: {
        width: "100%",
        height: "auto",
        minHeight: 100
    },
    cardContent: {
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    cardHeader: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        marginTop: 10
    },
});
