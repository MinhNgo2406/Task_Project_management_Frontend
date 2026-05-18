import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,

    primary: "#5B8DEF",
    secondary: "#7C4DFF",

    background: "#F4F7FC",
    surface: "#FFFFFF",

    text: "#1E293B",

    error: "#EF4444",

    outline: "#D6DCE8",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 16,
  colors: {
    ...MD3DarkTheme.colors,

    primary: "#7AA2FF",
    secondary: "#B388FF",

    background: "#0F172A",
    surface: "#1E293B",

    text: "#F8FAFC",

    error: "#F87171",

    outline: "#334155",
  },
};
