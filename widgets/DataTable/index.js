import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "@material-ui/core";

const DataTable = ({ table_data }) => {
  const { headers, body } = table_data;

  return (
    <TableContainer component={Paper}>
      <Table>
        <DataHead headers={headers} />
        <DataBody body={body} />
      </Table>
    </TableContainer>
  );
};

const DataHead = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header}>{header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const DataBody = ({ body }) => {
  return (
    <TableBody>
      {body.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {Object.entries(row.Data).map((col, colIndex) => (
            <TableCell
              key={colIndex}
              align={typeof col[1].value === "number" ? "right" : "left"}
            >
              <div>
                {col[0] === "Index"
                  ? rowIndex + 1
                  : col[1].value?.toLocaleString()}
              </div>
              {col[1].sub && (
                <div className={styles.sub}>{col[1].sub.toLocaleString()}</div>
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DataTable;
