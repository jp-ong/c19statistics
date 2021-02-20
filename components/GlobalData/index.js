import {
  Grid,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  SentimentDissatisfiedOutlined as ConfirmedIcon,
  SentimentVeryDissatisfiedOutlined as DeathIcon,
  SentimentVerySatisfiedOutlined as RecoveredIcon,
  AddOutlined as AddIcon,
} from "@material-ui/icons";
import { indigo, red, green, pink, teal } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: { width: "100%" },
});

const GlobalData = ({ data }) => {
  const {
    confirmed,
    deaths,
    recovered,
    confirmed_daily,
    deaths_daily,
    recovered_daily,
  } = data;

  return (
    <Grid container spacing={1}>
      <GridCard
        label={"Confirmed"}
        value={confirmed}
        icon={<ConfirmedIcon />}
        bgColor={indigo[700]}
      />
      <GridCard
        label={"Deaths"}
        value={deaths}
        icon={<DeathIcon />}
        bgColor={pink[700]}
      />
      <GridCard
        label={"Recovered"}
        value={recovered}
        icon={<RecoveredIcon />}
        bgColor={teal[700]}
      />
      <GridCard
        label={"New Confirmed"}
        value={confirmed_daily}
        icon={<AddIcon />}
        trimColor={indigo["A400"]}
      />
      <GridCard
        label={"New Deaths"}
        value={deaths_daily}
        icon={<AddIcon />}
        trimColor={red["A400"]}
      />
      <GridCard
        label={"New Recovered"}
        value={recovered_daily}
        icon={<AddIcon />}
        trimColor={green["A400"]}
      />
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
