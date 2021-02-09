import Head from "next/head";
import Layout from "components/Layout";
import GlobalData from "components/GlobalData";
import connectDB from "utils/connectDB";
import Stat from "models/Stat";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Global Statistics for COVID-19 Cases</title>
        <meta
          name="keywords"
          content="covid-19, global, statistics, confirmed, deaths, recovered, population"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <GlobalData data={data} fixed info={"Global"} />
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

const serialize = (d) => {
  return JSON.parse(JSON.stringify(d));
};
