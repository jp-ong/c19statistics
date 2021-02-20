import {
  AppBar,
  Paper,
  Toolbar,
  Switch,
  FormControlLabel,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  WbSunnyOutlined as SunIcon,
  Brightness2Outlined as MoonIcon,
} from "@material-ui/icons";
import { useContext } from "react";
import { ThemeContext } from "src/themes/ThemeContext";

const useStyles = makeStyles({
  root: {
    paddingTop: ".75em",
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
    <AppBar position="sticky" variant="elevation" elevation={0}>
      <Toolbar className={classes.root} component={Paper}>
        <Typography variant="h5" component="h1" className={classes.title}>
          <b>COVID19</b>
          <span style={{ fontSize: ".75em" }}>Statistics</span>
        </Typography>
        {themeName === "light" ? <SunIcon /> : <MoonIcon />}
        <FormControlLabel
          className={classes.labelPlacementEn}
          labelPlacement="end"
          label={`${
            themeName.charAt(0).toUpperCase() + themeName.slice(1)
          } Mode`}
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
    </AppBar>
  );
};

export default Navbar;
