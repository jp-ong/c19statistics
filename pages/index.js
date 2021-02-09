import Head from "next/head";
import Layout from "components/Layout";
import GlobalData from "components/GlobalData";

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
        <GlobalData data={data} />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const url = "https://api-covid-stats.herokuapp.com/api/stats/latest";
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600,
  };
}
