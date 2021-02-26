import { Typography, Button, Tooltip, Box } from "@material-ui/core";
import RouterButtons from "components/routerButtons";
import OverviewStats from "./OverviewStats";
import DataSection from "./DataSection";
import { useState } from "react";
import CountryPagination from "./CountryPagination";

const CountryData = ({ data, country, prevCountry, nextCountry }) => {
  const { rows, columns } = data;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <RouterButtons homeButton countryButton />
      <hr />
      <CountryPagination
        prevCountry={prevCountry}
        nextCountry={nextCountry}
        country={country}
      />
      <Typography variant="h4" component="h1" align="center">
        <b>{country}</b>
      </Typography>
      <Typography
        variant="subtitle1"
        component="h2"
        align="center"
        gutterBottom={true}
      >
        {rows[0].date}
      </Typography>
      <OverviewStats data={rows[0]} />
      <Box marginY="2em">
        <Tooltip title={`Show COVID19 Timeline of ${country}`}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setVisible(!visible)}
          >
            <b>{visible ? "Hide" : "Show"} Timeline</b>
          </Button>
        </Tooltip>
      </Box>
      {visible ? (
        <DataSection rows={rows} columns={columns} country={country} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CountryData;
