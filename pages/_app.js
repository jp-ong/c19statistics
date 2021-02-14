import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useState } from "react";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey[900],
    },
    text: { primary: grey[50] },
  },
});

const themeMap = {
  lightTheme,
  darkTheme,
};

function MyApp({ Component, pageProps }) {
  const [themeName, setThemeName] = useState("darkTheme");
  const theme = themeMap[themeName];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Component
          {...pageProps}
          currentTheme={themeName}
          setThemeName={setThemeName}
        />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default MyApp;
