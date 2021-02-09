import DataTable from "widgets/DataTable";

const GlobalData = ({ data, fixed, info }) => {
  return (
    <>
      <div>
        <span>
          Click on a <b>country</b> to see its summary.
        </span>
      </div>
      <DataTable table_data={data} date={data.date} fixed={fixed} info={info} />
    </>
  );
};

export default GlobalData;
