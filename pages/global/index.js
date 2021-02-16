import Head from "next/head";
import Layout from "components/Layout";
import GlobalData from "components/GlobalData";
import Stat from "models/Stat";
import connectDB from "utils/connectDB";

export default function WorldPage({ data, setThemeName, currentTheme }) {
  return (
    <>
      <Head>
        <title>Global COVID-19 Statistical Summary</title>
        <meta
          name="keywords"
          content={`covid-19, global, world, statistics, confirmed, deaths, recovered, population`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://c19statistics.vercel.app/global" />
      </Head>
      <Layout
        setThemeName={setThemeName}
        currentTheme={currentTheme}
        contentHeader={"Global"}
      >
        <GlobalData data={data} />
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
    confirmed: getTotal(stats, "confirmed"),
    deaths: getTotal(stats, "deaths"),
    recovered: getTotal(stats, "recovered"),
    confirmed_daily: getTotal(stats, "confirmed_daily"),
    deaths_daily: getTotal(stats, "deaths_daily"),
    recovered_daily: getTotal(stats, "recovered_daily"),
  };

  return {
    props: { data },
    revalidate: 3600,
  };
}

function serialize(d) {
  return JSON.parse(JSON.stringify(d));
}

function getTotal(arr, field) {
  return arr.map((a) => a[field]).reduce((val, total) => val + total, 0);
}
