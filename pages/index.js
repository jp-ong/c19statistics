import Head from "next/head";
import Layout from "components/Layout";
import LatestData from "components/LatestData";
import connectDB from "utils/connectDB";
import Stat from "models/Stat";

export default function HomePage({ data, setThemeName, currentTheme }) {
  return (
    <>
      <Head>
        <title>Latest Statistics for COVID-19 Cases</title>
        <meta
          name="keywords"
          content="covid-19, global, statistics, confirmed, deaths, recovered, population"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://c19statistics.vercel.app/" />
      </Head>
      <Layout
        homepage
        setThemeName={setThemeName}
        currentTheme={currentTheme}
        contentHeader={"Latest"}
      >
        <LatestData data={data} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  await connectDB();

  //Get date of latest entry
  const latest = await Stat.findOne().sort("-date");
  const latestDate = serialize(latest).date;

  //Query to avoid entries from non-country data
  const QUERY = {
    $and: [{ date: new Date(latestDate) }, { country_codes: { $ne: [] } }],
  };
  const PROJECT = {
    uids: 0,
    country_iso2s: 0,
    country_iso3s: 0,
    country_codes: 0,
    combined_names: 0,
  };
  const OPTIONS = { sort: { country: 1 } };

  //Exec query
  const stats = await Stat.find(QUERY, PROJECT, OPTIONS);

  //Format data for components
  const data = {
    date: latestDate,
    results: stats.length,
    stats: serialize(stats),
  };

  return {
    props: { data: formatData(data) },
    revalidate: 3600,
  };
}

//Format data for table
function formatData(data) {
  return {
    date: data.date,
    results: data.results,
    columns: [
      { field: "index", headerName: "Index", width: 100 },
      { field: "country", headerName: "Country", width: 300 },
      {
        field: "population",
        headerName: "Population",
        type: "number",
        width: 150,
      },
      {
        field: "confirmed",
        headerName: "Confirmed",
        type: "number",
        width: 150,
      },
      {
        field: "deaths",
        headerName: "Deaths",
        type: "number",
        width: 150,
      },
      {
        field: "recovered",
        headerName: "Recovered",
        type: "number",
        width: 150,
      },
      {
        field: "confirmed_daily",
        headerName: "+Confirmed",
        type: "number",
        width: 150,
      },
      {
        field: "deaths_daily",
        headerName: "+Deaths",
        type: "number",
        width: 150,
      },
      {
        field: "recovered_daily",
        headerName: "+Recovered",
        type: "number",
        width: 150,
      },
    ],
    rows: data.stats.map((stat, index) => {
      const country = stat.country === "Taiwan*" ? "Taiwan" : stat.country;
      return {
        id: index,
        index: index + 1,
        country,
        population: stat.population,
        confirmed: stat.confirmed,
        deaths: stat.deaths,
        recovered: stat.recovered,
        confirmed_daily: stat.confirmed_daily,
        deaths_daily: stat.deaths_daily,
        recovered_daily: stat.recovered_daily,
      };
    }),
  };
}

const serialize = (d) => {
  return JSON.parse(JSON.stringify(d));
};
