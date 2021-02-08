import Head from "next/head";
import Layout from "components/Layout";
import GlobalData from "components/GlobalData";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>COVID-19 | Global</title>
      </Head>
      <Layout>
        <GlobalData data={data} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const url = "https://api-covid-stats.herokuapp.com/api/stats/latest";
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600,
  };
}
