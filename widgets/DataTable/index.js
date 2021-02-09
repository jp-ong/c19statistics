import { useState } from "react";
import styles from "styles/modules/DataTable.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

const DataTable = ({ table_data, fixed, date }) => {
  const router = useRouter();
  const { headers, body } = table_data;

  const [sortBy, setSortBy] = useState("Index");
  const [sortedBody, setSortedBody] = useState(body);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [size, setSize] = useState(10);

  const sortClicked = (header) => {
    setSortBy(header);
    setSortedBody(
      body.sort((a, b) => {
        return typeof a.Data[header].value === "number"
          ? header === "Index"
            ? a.Data[header].value - b.Data[header].value
            : b.Data[header].value - a.Data[header].value
          : a.Data[header].value.localeCompare(b.Data[header].value);
      })
    );
  };

  const isMax = (n) => {
    return body.length <= sliceIndex + n;
  };

  const isMin = (n) => {
    return 0 > sliceIndex + n;
  };

  const sliceClicked = (n) => {
    const max = isMax(n);
    const min = isMin(n);

    if (!max && !min) setSliceIndex(sliceIndex + n);
  };
  const changeSize = () => {
    if (size === 10) {
      setSliceIndex(0);
      setSize(body.length);
    } else {
      setSize(10);
    }
  };

  return (
    <>
      <div className={styles.tableInfo}>
        <span>
          <small>Index size: </small>
          <b>{body.length}</b>
        </span>
        <span>
          <small>Latest data available at </small>
          <b>{new Date(date).toLocaleDateString("en-CA")}</b>
        </span>
        <button className={styles.button} onClick={() => router.reload()}>
          Refresh Data
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={`${styles.table} ${fixed ? styles.fixed : ""}`}>
          <TableHead
            headers={headers}
            sortBy={sortBy}
            sortClicked={sortClicked}
          />
          <TableBody
            sortedBody={sortedBody.slice(sliceIndex, sliceIndex + size)}
            indexSize={sliceIndex}
          />
        </table>
      </div>
      <TableControls
        changeSize={changeSize}
        sliceClicked={sliceClicked}
        size={size}
        isMax={isMax}
        isMin={isMin}
      />
    </>
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

const TableBody = ({ sortedBody, indexSize }) => {
  return (
    <tbody>
      {sortedBody.map((row, index) => (
        <TableRow
          row={row}
          rowIndex={parseInt(index + indexSize)}
          key={index}
        />
      ))}
    </tbody>
  );
};

const TableRow = ({ row, rowIndex }) => {
  return row.Link ? (
    <Link href={row.Link}>
      <tr key={rowIndex} className={row.Link ? styles.link : ""}>
        {Object.entries(row.Data).map((col, index) => (
          <TableCol
            key={index}
            rowIndex={rowIndex}
            col={col}
            colIndex={index}
          />
        ))}
      </tr>
    </Link>
  ) : (
    <tr key={rowIndex} className={row.Link ? styles.link : ""}>
      {Object.entries(row.Data).map((col, index) => (
        <TableCol key={index} rowIndex={rowIndex} col={col} colIndex={index} />
      ))}
    </tr>
  );
};

const TableCol = ({ col, rowIndex, colIndex, link }) => {
  return (
    <td>
      <div
        className={`${styles[col[1].style] || ""} ${styles[col[1].font] || ""}`}
      >
        <div>
          {col[0] === "Index" ? rowIndex + 1 : col[1].value?.toLocaleString()}
        </div>
        {col[1].sub && (
          <div className={styles.sub}>{col[1].sub.toLocaleString()}</div>
        )}
      </div>
    </td>
  );
};

const TableControls = ({ changeSize, sliceClicked, size, isMin, isMax }) => {
  return (
    <div className={styles.tableControls}>
      <button
        className={styles.button}
        disabled={size === 10}
        onClick={() => changeSize()}
      >
        Show 10
      </button>
      <button
        className={styles.button}
        disabled={size !== 10}
        onClick={() => changeSize()}
      >
        Show All
      </button>
      <button
        className={styles.button}
        disabled={isMin(-size) || size !== 10}
        onClick={() => sliceClicked(-size)}
      >
        Prev
      </button>
      <button
        className={styles.button}
        disabled={isMax(size) || size !== 10}
        onClick={() => sliceClicked(size)}
      >
        Next
      </button>
    </div>
  );
};

export default DataTable;
