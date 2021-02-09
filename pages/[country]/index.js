import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";
import { useRouter } from "next/router";
import connectDB from "utils/connectDB";
import Stat from "models/Stat";

export default function CountryPage({ data }) {
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
      <Layout summary>
        <CountryData fixed data={data} />
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

const serialize = (d) => {
  return JSON.parse(JSON.stringify(d));
};
