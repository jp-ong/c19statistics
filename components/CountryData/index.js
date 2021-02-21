import { DataGrid } from "@material-ui/data-grid";
import { Box, Paper, Typography } from "@material-ui/core";
import RouterButtons from "components/routerButtons";

const CountryData = ({ data, country }) => {
  const { rows, columns } = data;
  return (
    <>
      <RouterButtons homeButton countryButton />
      <hr />
      <DataHeader
        country={country}
        startDate={rows[rows.length - 1].date}
        endDate={rows[0].date}
      />
      <Box component={Paper} width="100%" height="34em">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          density="compact"
        />
      </Box>
    </>
  );
};

const DataHeader = ({ country, startDate, endDate }) => {
  const formatDate = (date) => new Date(date).toJSON().slice(0, 10);

  return (
    <Box marginY="1em">
      <Typography variant="h5" component="h1">
        COVID19 Timeline of <b>{country}</b> from <b>{formatDate(startDate)}</b>{" "}
        to <b>{formatDate(endDate)}</b>
      </Typography>
      <Typography variant="body2" component="span">
        Note: You can sort the data by clicking on the column headers
      </Typography>
    </Box>
  );
};

export default CountryData;
