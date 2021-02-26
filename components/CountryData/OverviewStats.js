import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import {
  blueGrey,
  teal,
  red,
  lightBlue,
  orange,
  deepPurple,
} from "@material-ui/core/colors";

const OverviewStats = ({ data }) => {
  return (
    <Grid container spacing={1}>
      {gridData(data).map(
        (
          { label, value, border, bgColor, textColor, md, bold, variant },
          index
        ) => (
          <Grid key={index} item xs={12} md={md}>
            <Card
              variant="outlined"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: border ? "solid 3px " + border : "",
              }}
            >
              <CardContent>
                <Typography variant="overline" component="h2" align="center">
                  {label}
                </Typography>
                <Typography
                  variant={variant ?? "h3"}
                  component="h3"
                  align="center"
                >
                  {bold ? <b>{value}</b> : value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      )}
    </Grid>
  );
};

const gridData = (data) => {
  const { confirmed, deaths, recovered, confirmed_daily } = data;
  const active = confirmed - deaths - recovered;
  const rates = {
    death_rate: (deaths / (confirmed - active)) * 100,
    recovery_rate: (recovered / (confirmed - active)) * 100,
  };
  return [
    {
      label: "Cases",
      value: confirmed.toLocaleString(),
      bgColor: orange["A200"],
      textColor: blueGrey[900],
      bold: true,
      variant: "h2",
    },
    {
      label: "Active",
      value: active.toLocaleString(),
      bgColor: lightBlue[600],
      textColor: blueGrey[50],
      md: 4,
    },
    {
      label: "Deaths",
      value: deaths.toLocaleString(),
      bgColor: red["A400"],
      textColor: blueGrey[50],
      md: 4,
    },
    {
      label: "Recovered",
      value: recovered.toLocaleString(),
      bgColor: teal[600],
      textColor: blueGrey[50],
      md: 4,
    },
    {
      label: "Newly Infected",
      value: confirmed_daily.toLocaleString(),
      border: deepPurple["A200"],
      bold: true,
    },
    {
      label: "Death Rate",
      value: rates.death_rate.toFixed(2) + " %",
      md: 6,
    },
    {
      label: "Recovery Rate",
      value: rates.recovery_rate.toFixed(2) + " %",
      md: 6,
    },
  ];
};

export default OverviewStats;
