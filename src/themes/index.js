import { createMuiTheme } from "@material-ui/core";

export const light = createMuiTheme({
  palette: {
    type: "light",
    background: { default: "rgb(238, 238, 255)", paper: "rgb(238, 238, 255)" },
    primary: { main: "rgb(238, 238, 255)" },
    contrastThreshold: 3,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export const dark = createMuiTheme({
  palette: { type: "dark" },
});
