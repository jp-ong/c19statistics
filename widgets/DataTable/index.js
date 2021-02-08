import { useState, useEffect } from "react";
import styles from "shared/styles/modules/DataTable.module.scss";

const DataTable = ({ table_data }) => {
  const { headers, body } = table_data;

  const [sortBy, setSortBy] = useState("Index");
  const [sortedBody, setSortedBody] = useState(body);

  const sortClicked = (header) => {
    setSortBy(header);
    setSortedBody(
      body.sort((a, b) => {
        return typeof a[header].value === "number"
          ? header === "Index"
            ? a[header].value - b[header].value
            : b[header].value - a[header].value
          : a[header].value.localeCompare(b[header].value);
      })
    );
  };

  return (
    <table className={styles.table}>
      <TableHead headers={headers} sortBy={sortBy} sortClicked={sortClicked} />
      <TableBody sortedBody={sortedBody} />
    </table>
  );
};

const TableHead = ({ headers, sortBy, sortClicked }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>
            <div
              className={sortBy === header ? styles.active : ""}
              onClick={() => sortClicked(header)}
            >
              {header}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({ sortedBody }) => {
  return (
    <tbody>
      {sortedBody.map((row, index) => (
        <TableRow row={row} rowIndex={index} key={index} />
      ))}
    </tbody>
  );
};

const TableRow = ({ row, rowIndex }) => {
  return (
    <tr key={rowIndex}>
      {Object.entries(row).map((col, index) => (
        <TableCol key={index} rowIndex={rowIndex} col={col} colIndex={index} />
      ))}
    </tr>
  );
};

const TableCol = ({ col, rowIndex, colIndex }) => {
  return (
    <td>
      <div className={`${styles[col[1].style]} ${styles[col[1].font]}`}>
        <div>
          {col[0] === "Index" ? rowIndex + 1 : col[1].value?.toLocaleString()}
        </div>
        <div className={styles.sub}>{col[1].sub?.toLocaleString()}</div>
      </div>
    </td>
  );
};
export default DataTable;
