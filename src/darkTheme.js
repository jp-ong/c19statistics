import { createMuiTheme } from "@material-ui/core";

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

export default darkTheme;
