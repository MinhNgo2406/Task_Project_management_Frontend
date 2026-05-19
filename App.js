import React, { createContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigator from "./src/navigation/AppNavigator";

export const ThemeContext = createContext();

const lightColors = {
  primary: "#2563EB",
  secondary: "#7C3AED",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  text: "#020617",
  subText: "#64748B",
  border: "#E2E8F0",
};

const darkColors = {
  primary: "#8B9EFF",
  secondary: "#C084FC",
  background: "#0F172A",
  surface: "#1E293B",
  card: "#1E293B",
  text: "#F8FAFC",
  subText: "#CBD5E1",
  border: "#334155",
};

const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightColors.primary,
    secondary: lightColors.secondary,
    background: lightColors.background,
    surface: lightColors.surface,
    onSurface: lightColors.text,
  },
};

const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkColors.primary,
    secondary: darkColors.secondary,
    background: darkColors.background,
    surface: darkColors.surface,
    onSurface: darkColors.text,
  },
};

const navigationLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.surface,
    text: lightColors.text,
    border: lightColors.border,
  },
};

const navigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.surface,
    text: darkColors.text,
    border: darkColors.border,
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    saveTheme();
  }, [isDarkMode]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("isDarkMode");

      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log("Load theme error:", error);
    }
  };

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    } catch (error) {
      console.log("Save theme error:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        colors,
      }}
    >
      <PaperProvider theme={isDarkMode ? paperDarkTheme : paperLightTheme}>
        <NavigationContainer
          theme={isDarkMode ? navigationDarkTheme : navigationLightTheme}
        >
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
