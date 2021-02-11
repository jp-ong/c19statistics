import DataTable from "widgets/DataTable";
import { useRouter } from "next/router";

const GlobalData = ({ data, fixed, info }) => {
  return (
    <>
      <DataTable
        DataNote={DataNote}
        table_data={data}
        date={data.date}
        fixed={fixed}
        info={info}
      />
    </>
  );
};

const DataNote = ({ styles }) => {
  const router = useRouter();
  return (
    <div className={styles.tableNote}>
      <span>
        Click on a <b>country</b> to see its summary.
      </span>

      <button className={styles.button} onClick={() => router.reload()}>
        Refresh Data
      </button>
    </div>
  );
};

export default GlobalData;
