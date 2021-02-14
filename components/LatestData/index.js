import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

const LatestData = ({ data }) => {
  const { headers, body, date, results } = data;
  return (
    <TableContainer component={Paper} color="primary">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row, rowIndex) => (
            <TableRow hover key={rowIndex}>
              {Object.values(row.Data).map(
                ({ value, sub, align }, colIndex) => (
                  <TableCell key={colIndex} align={align}>
                    <div>{value.toLocaleString()}</div>
                    {sub !== undefined && <div>{sub.toLocaleString()}</div>}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// const DataNote = ({ styles }) => {
//   const router = useRouter();
//   return (
//     <div className={styles.tableNote}>
//       <span>
//         Click on a <b>country</b> to see its summary.
//       </span>

//       <button className={styles.button} onClick={() => router.reload()}>
//         Refresh Data
//       </button>
//     </div>
//   );
// };

export default LatestData;
