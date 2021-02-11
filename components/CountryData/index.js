import DataTable from "widgets/DataTable";
import Link from "next/link";
import { useRouter } from "next/router";

const CountryData = ({ data, fixed, info }) => {
  return (
    <DataTable
      DataNote={DataNote}
      table_data={data}
      fixed={fixed}
      date={data.date}
      info={info}
    />
  );
};

const DataNote = ({ styles }) => {
  const router = useRouter();
  return (
    <div className={styles.tableNote}>
      <Link href="/">
        <a>
          &larr;{" "}
          <span>
            Back to <b>Global Statistics</b>
          </span>
        </a>
      </Link>
      <button className={styles.button} onClick={() => router.reload()}>
        Refresh Data
      </button>
    </div>
  );
};

export default CountryData;
