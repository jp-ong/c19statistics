import React from "react";
import Navbar from "components/Navbar";
import { Container, Button, Grid, Typography } from "@material-ui/core";
import {
  Home,
  Refresh,
  Brightness7Rounded as Sun,
  Brightness4Rounded as Moon,
} from "@material-ui/icons";
import { useRouter } from "next/router";

const Layout = ({
  children,
  setThemeName,
  currentTheme,
  homepage,
  contentHeader,
}) => {
  const router = useRouter();
  return (
    <>
      <Navbar
        setThemeName={setThemeName}
        currentTheme={currentTheme}
        subtitle={contentHeader}
      />
      <Container style={{ marginTop: "2em", marginBottom: "2em" }}>
        <main>
          <Grid container justify="space-between" alignItems="flex-end">
            <Grid item>
              <Button
                variant="text"
                size="medium"
                aria-label="home"
                onClick={() => router.push("/")}
                disabled={homepage}
              >
                <Home />
              </Button>
              {homepage && (
                <Typography variant="subtitle2" component="span">
                  Click on a <b>country</b>!
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    variant="outlined"
                    size="small"
                    aria-label="refresh"
                    onClick={() => router.reload()}
                    fullWidth
                  >
                    <Refresh />
                  </Button>
                </Grid>
                <Grid item>
                  <ThemeButton
                    currentTheme={currentTheme}
                    setThemeName={setThemeName}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {children}
        </main>
        <footer>
          <div>© 2021 John Paul Ong</div>
        </footer>
      </Container>
    </>
  );
};

const ThemeButton = ({ currentTheme, setThemeName }) =>
  currentTheme === "darkTheme" ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => setThemeName("lightTheme")}
      size="small"
      aria-label="light mode"
      fullWidth
    >
      <Sun />
    </Button>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => setThemeName("darkTheme")}
      size="small"
      aria-label="dark mode"
      fullWidth
    >
      <Moon />
    </Button>
  );

export default Layout;
