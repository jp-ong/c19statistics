import DataTable from "widgets/DataTable";
import Stats from "data.json";

function fetchTableData() {
  const table_data = {
    headers: [
      "Index",
      "Country",
      "Population",
      "Confirmed",
      "Deaths",
      "Recovered",
    ],
    body: [
      ...Stats.stats.map((stat, index) => {
        return {
          Index: {
            value: index + 1,
            style: "index",
            font: "normal",
          },
          Country: {
            value: stat.country,
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
        };
      }),
    ],
  };
  return table_data;
}

const GlobalData = () => {
  return <DataTable table_data={fetchTableData()} />;
};

export default GlobalData;
