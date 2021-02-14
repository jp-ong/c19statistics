import { createMuiTheme } from "@material-ui/core";

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

export default lightTheme;
