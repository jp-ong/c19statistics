import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Link as MuiLink,
  Paper,
} from "@material-ui/core";

const Navbar = ({ subtitle }) => {
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
    <AppBar position="sticky">
      <Toolbar
        style={{ padding: "2em 5vw .5em", boxShadow: "none" }}
        component={Paper}
      >
        <Grid container alignItems="flex-end" justify="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h1">
              COVID<b>19</b>
              <small style={{ fontSize: ".6em" }}>{subtitle}</small>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              justify="flex-end"
              alignItems="flex-end"
              style={{ textAlign: "right" }}
            >
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2">
                  <b>{time.toLocaleString()}</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2">
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
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2">
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
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
