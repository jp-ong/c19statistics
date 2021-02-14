import { DataGrid } from "@material-ui/data-grid";
import { Box, Paper } from "@material-ui/core";

const CountryData = ({ data }) => {
  const { columns, rows } = data;
  return (
    <Box component={Paper} style={{ width: "100%", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};

export default CountryData;
