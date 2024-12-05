import { StyleSheet } from "react-native";
import { theme } from "../constants/Colors";

export const FontStyles = StyleSheet.create({
    headline: {
        textShadowColor: theme.colors.headlineShadow,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
});
