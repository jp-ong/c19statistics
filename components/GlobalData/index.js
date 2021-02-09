import DataTable from "widgets/DataTable";
import Link from "next/link";
// import useSWR from "swr";

// function fetchData() {
//   const url = "/api/latest";
//   const { data, error } = useSWR(url);

//   return {
//     data,
//     isLoading: !data & !error,
//     isError: error,
//   };
// }

function formatData(data) {
  return {
    headers: [
      "Index",
      "Country",
      "Population",
      "Confirmed",
      "Deaths",
      "Recovered",
    ],
    body: data.stats.map((stat, index) => {
      const country = stat.country === "Taiwan*" ? "Taiwan" : stat.country;
      return {
        Link: `/${country}`,
        Data: {
          Index: {
            value: index + 1,
            style: "index",
            font: "normal",
          },
          Country: {
            value: country,
            style: "text",
            font: "bold",
          },
          Population: {
            value: stat.population,
            style: "number",
            font: "normal",
          },
          Confirmed: {
            value: stat.confirmed,
            sub: stat.confirmed_daily,
            style: "number",
            font: "normal",
          },
          Deaths: {
            value: stat.deaths,
            sub: stat.deaths_daily,
            style: "number",
            font: "normal",
          },
          Recovered: {
            value: stat.recovered,
            sub: stat.recovered_daily,
            style: "number",
            font: "normal",
          },
        },
      };
    }),
  };
}

const GlobalData = ({ data }) => {
  // const { data, isLoading, isError } = fetchData();
  // if (isLoading) return <>Loading</>;
  // if (isError) return <>Error</>;

  const tableData = formatData(data);
  return (
    <>
      <div>
        <span>
          Click on a <b>country</b> to see its summary.
        </span>
      </div>
      <DataTable table_data={tableData} date={data.date} />
    </>
  );
};

export default GlobalData;
