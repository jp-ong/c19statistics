import fetchDataOnDate from "src/data/fetchDataOnDate";
import fetchLatestEntry from "src/data/fetchLatestEntry";
import Head from "next/head";
import Layout from "components/layout";
import LatestData from "components/LatestData";

const LatestPage = ({ data, date }) => {
  return (
    <>
      <Head>
        <title>Latest Statistics for COVID-19 Cases</title>
        <meta
          name="keywords"
          content="covid-19, global, statistics, confirmed, deaths, recovered, population, latest, daily, average"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://c19statistics.vercel.app/latest" />
      </Head>
      <Layout>
        <LatestData data={data} date={date} />
      </Layout>
    </>
  );
};

export default LatestPage;

export async function getStaticProps() {
  const { date } = await fetchLatestEntry();
  const { data } = await fetchDataOnDate(date);

  return {
    props: {
      data: formatData(data),
      date,
    },
    revalidate: 3600,
  };
}

const formatData = (data) => {
  const columns = [
    { field: "id", headerName: "Index", width: 100, type: "number" },
    { field: "country", headerName: "Country", width: 200, type: "string" },
    {
      field: "population",
      headerName: "Population",
      width: 200,
      type: "number",
    },
    { field: "confirmed", headerName: "Confirmed", width: 150, type: "number" },
    { field: "deaths", headerName: "Deaths", width: 150, type: "number" },
    { field: "recovered", headerName: "Recovered", width: 150, type: "number" },
    {
      field: "confirmed_daily",
      headerName: "New Confirmed",
      width: 170,
      type: "number",
    },
    {
      field: "deaths_daily",
      headerName: "New Deaths",
      width: 170,
      type: "number",
    },
    {
      field: "recovered_daily",
      headerName: "New Recovered",
      width: 170,
      type: "number",
    },
  ];

  const rows = data.map(
    (
      {
        country,
        population,
        confirmed,
        deaths,
        recovered,
        confirmed_daily,
        deaths_daily,
        recovered_daily,
      },
      index
    ) => {
      return {
        id: index + 1,
        country: country === "Taiwan*" ? "Taiwan" : country,
        population,
        confirmed,
        deaths,
        recovered,
        confirmed_daily,
        deaths_daily,
        recovered_daily,
      };
    }
  );

  return { columns, rows };
};
