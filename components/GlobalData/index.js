import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  SentimentDissatisfiedOutlined as ConfirmedIcon,
  SentimentVeryDissatisfiedOutlined as DeathIcon,
  SentimentVerySatisfiedOutlined as RecoveredIcon,
  AddOutlined as AddIcon,
} from "@material-ui/icons";
import { indigo, red, green, pink, teal } from "@material-ui/core/colors";
import CountrySelector from "./CountrySelector";
import RouterButtons from "components/RouterButtons";

const useStyles = makeStyles({
  root: { width: "100%" },
});

const GlobalData = ({ data, countries, date }) => {
  return (
    <>
      <RouterButtons countryButton />
      <hr />
      <Typography variant="h4" component="h1">
        Summaries as of <b>{new Date(date).toJSON().slice(0, 10)}</b> from{" "}
        <b>{countries.length}</b> countries.
      </Typography>
      <CountrySelector countries={countries} />
      <GridSection data={data} />
    </>
  );
};

const GridSection = ({ data }) => {
  const {
    confirmed,
    deaths,
    recovered,
    confirmed_daily,
    deaths_daily,
    recovered_daily,
  } = data;

  const items = [
    {
      label: "Confirmed",
      value: confirmed,
      icon: <ConfirmedIcon />,
      bgColor: indigo[700],
    },
    {
      label: "Deaths",
      value: deaths,
      icon: <DeathIcon />,
      bgColor: pink[700],
    },
    {
      label: "Recovered",
      value: recovered,
      icon: <RecoveredIcon />,
      bgColor: teal[700],
    },
    {
      label: "New Confirmed",
      value: confirmed_daily,
      icon: <AddIcon />,
      trimColor: indigo["A400"],
    },
    {
      label: "New Deaths",
      value: deaths_daily,
      icon: <AddIcon />,
      trimColor: red["A400"],
    },
    {
      label: "New Recovered",
      value: recovered_daily,
      icon: <AddIcon />,
      trimColor: green["A400"],
    },
  ];

  return (
    <Grid container spacing={1}>
      {items.map(({ label, value, icon, bgColor, trimColor }) => (
        <GridCard
          key={label}
          label={label}
          value={value}
          icon={icon}
          bgColor={bgColor}
          trimColor={trimColor}
        />
      ))}
    </Grid>
  );
};

const GridCard = ({ label, value, icon, bgColor, trimColor }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root} variant="outlined">
        <CardContent
          style={
            bgColor
              ? { backgroundColor: bgColor, color: "white" }
              : { border: `solid 2px ${trimColor}` }
          }
        >
          <Typography component="h2" variant="overline" align="center">
            <b>{label}</b>
          </Typography>
          <Typography component="h3" variant="h4" align="center">
            {icon} <b>{value.toLocaleString()}</b>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GlobalData;
