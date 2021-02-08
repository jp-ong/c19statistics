import DataTable from "widgets/DataTable";
import useSWR from "swr";

function fetchData(country) {
  const url = "/api/country/" + country;
  const { data, error } = useSWR(url);

  return {
    data,
    isLoading: !data & !error,
    isError: error,
  };
}

function formatData(data) {
  return {
    headers: [
      "Index",
      "Date",
      "Confirmed",
      "Deaths",
      "Recovered",
      "New_Confirmed",
      "New_Deaths",
      "New_Recovered",
    ],
    body: data.stats.map((stat, index) => {
      return {
        Link: `/${stat.country}`,
        Data: {
          Index: {
            value: index + 1,
            style: "index",
            font: "normal",
          },
          Date: {
            value: new Date(stat.date).toLocaleDateString("en-CA"),
            style: "center",
            font: "normal",
          },
          Confirmed: {
            value: stat.confirmed,
            style: "center",
            font: "normal",
          },
          Deaths: {
            value: stat.deaths,
            style: "center",
            font: "normal",
          },
          Recovered: {
            value: stat.recovered,
            style: "center",
            font: "normal",
          },
          New_Confirmed: {
            value: stat.confirmed_daily,
            style: "center",
            font: "normal",
          },
          New_Deaths: {
            value: stat.deaths_daily,
            style: "center",
            font: "normal",
          },
          New_Recovered: {
            value: stat.recovered_daily,
            style: "center",
            font: "normal",
          },
        },
      };
    }),
  };
}

const CountryData = ({ country, fixed }) => {
  const { data, isLoading, isError } = fetchData(country);
  if (isLoading) return <>Loading</>;
  if (isError) return <>Error</>;

  const tableData = formatData(data);
  return <DataTable table_data={tableData} fixed={fixed} />;
};

export default CountryData;
