import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import { TextField, Link as MuiLink, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "block",
    width: "100%",
    height: "100%",
  },
});

const CountrySelector = ({ countries }) => {
  const classes = useStyles();
  const router = useRouter();
  const countryClicked = ({ target: { textContent } }) => {
    router.push(`/${textContent}`);
  };
  const countryHovered = ({ target: { textContent } }) => {
    router.prefetch(`/${textContent}`);
  };
  return (
    <Autocomplete
      id="country-select"
      style={{ width: "100%", marginBottom: "1em" }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(option) => (
        <MuiLink
          className={classes.root}
          color="inherit"
          value={option}
          onClick={countryClicked}
          underline="none"
          onMouseOver={countryHovered}
        >
          {option}
        </MuiLink>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          color="secondary"
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

export default CountrySelector;
