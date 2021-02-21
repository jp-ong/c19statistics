import Head from "next/head";
import Layout from "components/layout";
import GlobalData from "components/GlobalData";
import fetchGlobalData from "src/data/fetchGlobalData";

export default function HomePage({ data, countries, date }) {
  return (
    <>
      <Head>
        <title>Summary Statistics for COVID-19 Cases</title>
        <meta
          name="keywords"
          content="covid-19, global, statistics, confirmed, deaths, recovered, population, summary, total"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://c19statistics.vercel.app/" />
      </Head>
      <Layout>
        <GlobalData data={data} countries={countries} date={date} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await fetchGlobalData();
  return {
    props: {
      data: reduceData(data),
      countries: data
        .map(({ country }) => (country === "Taiwan*" ? "Tawain" : country))
        .sort(),
      date: data[0].date,
    },
    revalidate: 3600,
  };
}

const reduceData = (data) => {
  return data.reduce(
    (total, current) => {
      return {
        confirmed: total.confirmed + current.confirmed,
        deaths: total.deaths + current.deaths,
        recovered: total.recovered + current.recovered,
        confirmed_daily: total.confirmed_daily + current.confirmed_daily,
        deaths_daily: total.deaths_daily + current.deaths_daily,
        recovered_daily: total.recovered_daily + current.recovered_daily,
      };
    },
    {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      confirmed_daily: 0,
      deaths_daily: 0,
      recovered_daily: 0,
    }
  );
};
