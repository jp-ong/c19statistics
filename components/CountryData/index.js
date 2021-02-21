import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography, Tooltip, Button } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import { useRouter } from "next/router";

const CountryData = ({ data, country }) => {
  const { rows, columns } = data;
  const router = useRouter();
  return (
    <>
      {" "}
      <Tooltip title="Go to home page" arrow placement="right">
        <Button
          onClick={() => router.push("/")}
          onMouseOver={() => router.prefetch("/")}
          startIcon={<HomeIcon />}
          variant="text"
        >
          Go to home page
        </Button>
      </Tooltip>
      <DataHeader
        country={country}
        startDate={rows[rows.length - 1].date}
        endDate={rows[0].date}
      />
      <Box width="100%" height="34em">
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
    </Box>
  );
};

export default CountryData;
