import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Link as MuiLink,
} from "@material-ui/core";
import { Brightness7 as Sun, Brightness4 as Moon } from "@material-ui/icons";

const Navbar = ({ currentTheme, setThemeName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <AppBar
      position="sticky"
      style={{ height: "5rem", justifyContent: "flex-end" }}
    >
      <Toolbar>
        <Grid container alignItems="flex-end" justify="space-between">
          <Grid item>
            <Typography variant="h5" component="h1">
              COVID<b>19</b>
              <small style={{ fontSize: ".6em" }}>Statistics</small>
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justify="space-between"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item>
                <Typography variant="subtitle2">
                  <b>{time.toLocaleString()}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  <small>By </small>
                  <b>
                    <MuiLink
                      href="https://github.com/jp-ong"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                    >
                      John Paul Ong
                    </MuiLink>
                  </b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  <small>Source </small>
                  <b>
                    <MuiLink
                      href="https://developer.mongodb.com/article/johns-hopkins-university-covid-19-data-atlas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                    >
                      JHU MongoDB Atlas
                    </MuiLink>
                  </b>
                </Typography>
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
      </Toolbar>
    </AppBar>
  );
};

const ThemeButton = ({ currentTheme, setThemeName }) =>
  currentTheme === "darkTheme" ? (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setThemeName("lightTheme")}
      startIcon={<Sun />}
      size="small"
    >
      Light
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setThemeName("darkTheme")}
      startIcon={<Moon />}
      size="small"
    >
      Dark
    </Button>
  );

{
  /* <nav>
      <div>
        <div>
          <Link href="/">
            <a>
              <h1>
                COVID<b>19</b>
                <span>{navtext}</span>
              </h1>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <small>By </small>
          <a
            href="https://github.com/jp-ong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>John Paul Ong</b>
          </a>
        </div>
        <div>
          <small>Source </small>
          <a
            href="https://developer.mongodb.com/article/johns-hopkins-university-covid-19-data-atlas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>JHU MongoDB Atlas</b>
          </a>
        </div>
        <div>
          <span>{time.toLocaleString()}</span>
        </div>
      </div>
    </nav> */
}

export default Navbar;
