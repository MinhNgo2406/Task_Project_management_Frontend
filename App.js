import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import AppNavigator from "./src/navigation/AppNavigator";
import { lightTheme, darkTheme } from "./src/theme/theme";

export const ThemeContext = React.createContext();

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <PaperProvider theme={currentTheme}>
        <NavigationContainer theme={currentTheme}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
