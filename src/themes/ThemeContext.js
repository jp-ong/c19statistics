import { createContext, useState } from "react";
import { light, dark } from ".";
import { ThemeProvider } from "@material-ui/core";

const themeMap = {
  light,
  dark,
};

export const ThemeContext = createContext(themeMap["light"]);

const MyThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  const theme = themeMap[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default MyThemeProvider;
