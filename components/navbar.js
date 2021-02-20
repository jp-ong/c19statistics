import {
  AppBar,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { useContext } from "react";
import { ThemeContext } from "src/themes/ThemeContext";

const useStyles = makeStyles({
  root: {
    paddingTop: ".75em",
  },
  title: {
    flexGrow: 1,
  },
});

const Navbar = () => {
  const classes = useStyles();
  const { themeName, setThemeName } = useContext(ThemeContext);
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.root}>
        <Typography variant="h5" component="h1" className={classes.title}>
          <b>COVID19</b>
          <small style={{ fontSize: ".75em" }}>Statistics</small>
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                icon={<Brightness7 />}
                checkedIcon={<Brightness4 />}
                onChange={() =>
                  setThemeName(themeName === "light" ? "dark" : "light")
                }
              />
            }
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
