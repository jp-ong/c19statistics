import {
  Box,
  AppBar,
  Paper,
  Toolbar,
  Switch,
  FormControlLabel,
  Typography,
  makeStyles,
  Link,
} from "@material-ui/core";
import {
  WbSunnyOutlined as SunIcon,
  Brightness2Outlined as MoonIcon,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "src/themes/ThemeContext";

const useStyles = makeStyles({
  root: {
    paddingTop: "2em",
    borderRadius: 0,
    height: "4.5rem",
  },
  title: {
    flexGrow: 1,
  },
  labelPlacementEn: {
    marginLeft: 1,
  },
});

const Navbar = () => {
  const classes = useStyles();
  const { themeName, setThemeName } = useContext(ThemeContext);
  return (
    <AppBar
      position="relative"
      variant="outlined"
      style={{ border: "none" }}
      color="transparent"
    >
      <Toolbar className={classes.root} component={Paper}>
        <Typography variant="h5" component="h1" className={classes.title}>
          <b>COVID19</b>
          <span style={{ fontSize: ".75em" }}>Statistics</span>
        </Typography>
        {themeName === "light" ? <SunIcon /> : <MoonIcon />}
        <FormControlLabel
          className={classes.labelPlacementEn}
          labelPlacement="end"
          label={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          control={
            <Switch
              aria-label="Toggle Light or Dark Mode"
              title="Toggle Light or Dark Mode"
              onChange={() =>
                setThemeName(themeName === "light" ? "dark" : "light")
              }
            />
          }
        ></FormControlLabel>
      </Toolbar>
      <ExtraNavbar />
    </AppBar>
  );
};

const ExtraNavbar = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="flex-start"
      padding=".5em"
      gridGap=".5em"
      flexWrap="wrap"
      color="text.primary"
    >
      <Typography variant="body2" component="span">
        <small>By </small>
        <b>
          <Link
            href="https://github.com/jp-ong"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            John Paul Ong
          </Link>
        </b>
      </Typography>
      <Typography variant="body2" component="span">
        <small>Source </small>
        <Link
          href="https://developer.mongodb.com/article/johns-hopkins-university-covid-19-data-atlas/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <b>JHU MongoDB Atlas</b>
        </Link>
      </Typography>
      <Typography variant="body2" component="span">
        <small>Date </small>
        <b>{time.toLocaleString()}</b>
      </Typography>
    </Box>
  );
};

export default Navbar;
