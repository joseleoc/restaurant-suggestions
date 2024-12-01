import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "#fcba39",
    onPrimary: "#fff",
    headlineShadow: "rgba(255, 87, 87, 0.4)",
    secondary: "#ff5757",
    onSecondary: "#fff",
  },
};
