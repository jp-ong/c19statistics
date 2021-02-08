import Head from "next/head";
import Layout from "components/Layout";
import GlobalData from "components/GlobalData";
import axios from "axios";

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
  const url = process.env.API_SERVER + "/api/stats/latest";
  const res = await axios(url).then((res) => res);
  const data = await res.data;

  return {
    props: { data },
    revalidate: 3600,
  };
}
