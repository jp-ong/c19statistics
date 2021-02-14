import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { useState } from "react";

const lightTheme = createMuiTheme({
  overrides: { MuiDataGrid: { root: { cursor: "pointer" } } },
  palette: {
    type: "light",
    primary: {
      main: "#f2f8fe",
      light: "#f2f8fe",
      dark: "#00adb5",
      contrastText: "#222831",
    },
    secondary: {
      main: "#222831",
      light: "#f2f8fe",
      dark: "#00adb5",
      contrastText: "#f2f8fe",
    },
    background: { default: "#f2f8fe", paper: "#f2f8fe" },
    text: {
      primary: "#222831",
      secondary: "#42484e",
      hint: "#595e56",
      disabled: "#a2a8ae",
    },
    action: { hover: "#dbe2ef" },
    divider: "#222831",
  },
});

const darkTheme = createMuiTheme({
  overrides: { MuiDataGrid: { root: { cursor: "pointer" } } },
  palette: {
    type: "dark",
    primary: {
      main: "#393e46",
      light: "#00adb5",
      dark: "#222831",
      contrastText: "#eeeeee",
    },
    secondary: {
      main: "#eeeeee",
      light: "#00adb5",
      dark: "#00adb5",
      contrastText: "#393e46",
    },
    background: { default: "#393e46", paper: "#222831" },
    text: {
      primary: "#eeeeee",
      secondary: "#00adb5",
      hint: "#f2f8fe",
      disabled: "#222831",
    },
    divider: "#f2f8fe",
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
