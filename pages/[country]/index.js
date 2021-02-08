import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";
import axios from "axios";

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

export async function getStaticProps({ params }) {
  const url = process.env.API_SERVER + "/api/stats/country/" + params.country;
  const response = await axios(url).then((res) => res);
  const data = await response.data;

  return {
    props: { data },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const url = process.env.API_SERVER + "/api/stats/latest";
  const res = await fetch(url);
  const data = await res.json();

  const paths = data.stats.map((stat) => ({
    params: { country: stat.country },
  }));

  return { paths, fallback: true };
}
