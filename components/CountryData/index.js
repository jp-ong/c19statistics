import DataTable from "widgets/DataTable";
import Link from "next/link";

const CountryData = ({ data, fixed, info }) => {
  return (
    <>
      <div>
        <Link href="/">
          <a>
            &larr;{" "}
            <span>
              Back to <b>Global Statistics</b>
            </span>
          </a>
        </Link>
      </div>
      <DataTable table_data={data} fixed={fixed} date={data.date} info={info} />
    </>
  );
};

export default CountryData;
