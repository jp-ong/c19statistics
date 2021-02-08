import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";

export default function CountryPage({ data }) {
  return (
    <>
      <Head>
        <title>COVID-19 | Global</title>
      </Head>
      <Layout>
        <CountryData data={data} fixed />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const url =
    process.env.API_SERVER + "/api/stats/country/" + context.params.country;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const url = "https://api-covid-stats.herokuapp.com/api/stats/latest";
  const res = await fetch(url);
  const data = await res.json();

  const paths = data.stats.map((stat) => ({
    params: { country: stat.country.toString() },
  }));

  return { paths, fallback: true };
}
