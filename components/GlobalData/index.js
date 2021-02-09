import DataTable from "widgets/DataTable";

const GlobalData = ({ data }) => {
  return (
    <>
      <div>
        <span>
          Click on a <b>country</b> to see its summary.
        </span>
      </div>
      <DataTable table_data={data} date={data.date} />
    </>
  );
};

export default GlobalData;
