import { DataGrid } from "@material-ui/data-grid";
import { useRouter } from "next/router";
import { Box, Paper } from "@material-ui/core";

const LatestData = ({ data }) => {
  const { columns, rows } = data;
  const router = useRouter();
  return (
    <Box component={Paper} style={{ width: "100%", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={({ row }) => router.push(`/${row.country}`)}
        onRowHover={({ row }) => router.prefetch(`/${row.country}`)}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};

export default LatestData;
