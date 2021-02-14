import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";
import { useRouter } from "next/router";
import connectDB from "utils/connectDB";
import Stat from "models/Stat";

export default function CountryPage({ data, setThemeName, currentTheme }) {
  const router = useRouter();
  const { country } = router.query;
  return (
    <>
      <Head>
        <title>{country} | COVID-19 Statistical Summary</title>
        <meta
          name="keywords"
          content={`covid-19, ${country}, summary, statistics, confirmed, deaths, recovered, population`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout
        setThemeName={setThemeName}
        currentTheme={currentTheme}
        contentHeader={country}
      >
        <CountryData data={data} />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  await connectDB();

  const country =
    context.params.country === "Taiwan" ? "Taiwan*" : context.params.country;

  //Get date of latest entry
  const latest = await Stat.findOne().sort("-date");
  const latestDate = serialize(latest).date;

  //Query to avoid entries from non-country data
  const QUERY = { country };
  const PROJECT = {
    uids: 0,
    country_iso2s: 0,
    country_iso3s: 0,
    country_codes: 0,
    combined_names: 0,
  };
  const OPTIONS = { sort: { date: -1 } };

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

export async function getStaticPaths() {
  await connectDB();

  //Get date of latest entry
  const latest = await Stat.findOne().sort("-date");
  const latestDate = serialize(latest).date;

  //Get list of countries
  const stats = await Stat.find(
    { date: latestDate },
    { country: 1 },
    { sort: { country: 1 } }
  );

  const paths = stats.map(({ country }) => {
    return {
      params: {
        country: country === "Taiwan*" ? "Taiwan" : country,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

function formatData(data) {
  return {
    date: data.date,
    results: data.results,
    columns: [
      { field: "index", headerName: "Index", width: 100 },
      { field: "date", headerName: "Date", width: 200 },
      {
        field: "confirmed",
        headerName: "Confirmed",
        width: 150,
        type: "number",
      },
      { field: "deaths", headerName: "Deaths", width: 150, type: "number" },
      {
        field: "recovered",
        headerName: "Recovered",
        width: 150,
        type: "number",
      },
      {
        field: "confirmed_daily",
        headerName: "+Confirmed",
        width: 150,
        type: "number",
      },
      {
        field: "deaths_daily",
        headerName: "+Deaths",
        width: 150,
        type: "number",
      },
      {
        field: "recovered_daily",
        headerName: "+Recovered",
        width: 150,
        type: "number",
      },
    ],
    rows: data.stats.map((stat, index) => {
      return {
        id: index,
        index: index + 1,
        date: new Date(stat.date).toLocaleDateString("en-CA"),
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
