import React from "react";
import { CssBaseline } from "@material-ui/core";
import ThemeContext from "src/themes/ThemeContext";
import "styles/global.scss";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeContext>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeContext>
  );
}

export default MyApp;
