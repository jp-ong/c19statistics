import { Box, Typography, Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import RouterButtons from "components/routerButtons";
import Link from "next/link";

const LatestData = ({ data, date }) => {
  const { rows } = data;
  const columns = [
    {
      field: "id",
      headerName: "Index",
      width: 100,
      type: "number",
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
      type: "string",
      cellClassName: "country-row-cell",
      renderCell: (params) => (
        <b>
          <Link href={`/${params.value}`}>{params.value}</Link>
        </b>
      ),
    },
    {
      field: "population",
      headerName: "Population",
      width: 200,
      type: "number",
    },
    { field: "confirmed", headerName: "Confirmed", width: 150, type: "number" },
    { field: "deaths", headerName: "Deaths", width: 150, type: "number" },
    { field: "recovered", headerName: "Recovered", width: 150, type: "number" },
    {
      field: "confirmed_daily",
      headerName: "New Confirmed",
      width: 170,
      type: "number",
    },
    {
      field: "deaths_daily",
      headerName: "New Deaths",
      width: 170,
      type: "number",
    },
    {
      field: "recovered_daily",
      headerName: "New Recovered",
      width: 170,
      type: "number",
    },
  ];
  return (
    <>
      <RouterButtons homeButton />
      <hr />
      <DataHeader date={date} length={rows.length} />
      <Box component={Paper} width="100%" height="34em">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[10, 25, 50, 100]}
          density="compact"
        />
      </Box>
    </>
  );
};

const DataHeader = ({ date, length }) => (
  <Box marginY="1em" display="flex" flexDirection="column" gridGap="1em">
    <Typography variant="h4" component="h1">
      Reported cases for <b>{new Date(date).toJSON().slice(0, 10)}</b> from{" "}
      <b>{length}</b> countries
    </Typography>
    <Typography variant="body2" component="span">
      Select a <b>country</b> to see its timeline
    </Typography>
    <Typography variant="body2" component="span">
      Note: You can sort the data by clicking on the column headers
    </Typography>
  </Box>
);
export default LatestData;
