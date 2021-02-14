import { DataGrid } from "@material-ui/data-grid";
import { useRouter } from "next/router";

const LatestData = ({ data }) => {
  const { columns, rows } = data;
  const router = useRouter();
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={({ row }) => router.push(`/${row.country}`)}
        get
        paginationMode="server"
      />
    </div>
  );
};

export default LatestData;
