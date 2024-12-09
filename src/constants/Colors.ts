import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "#fa4b5b",
    onPrimary: "#fff",
    secondary: "#fad14b",
    onSecondary: "#fff",
    tertiary: "#fdba3a",
    onTertiary: "#fff",
    background: "#fcba39",
    onBackground: "#fff",
    headlineShadow: "rgba(255, 87, 87, 0.4)",
    light: "#fcba39",
    onLight: "#fff",
    surface: "#fff",
    surfaceVariant: "#00000026",
    onSurface: "#000",

    dark: {},
  },
};
