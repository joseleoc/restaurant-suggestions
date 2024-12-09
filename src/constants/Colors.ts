import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    secondary: "#ff5757",
    onSecondary: "#fff",
    background: "#fcba39",
    onBackground: "#fff",
    headlineShadow: "rgba(255, 87, 87, 0.4)",
    light: "#fcba39",
    onLight: "#fff",
    surface: '#fff',
    surfaceVariant: '#fff',
    onSurface: '#000',
  },
};
