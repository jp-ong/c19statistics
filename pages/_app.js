import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import darkTheme from "../src/darkTheme";
import lightTheme from "../src/lightTheme";

const themeMap = {
  lightTheme,
  darkTheme,
};

function MyApp({ Component, pageProps }) {
  const [themeName, setThemeName] = useState("lightTheme");
  const theme = themeMap[themeName];

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component
        {...pageProps}
        currentTheme={themeName}
        setThemeName={setThemeName}
      />
    </ThemeProvider>
  );
}

export default MyApp;
