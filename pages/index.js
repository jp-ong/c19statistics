import Head from "next/head";
import Layout from "components/Layout";
import GlobalData from "components/GlobalData";

export default function Home() {
  return (
    <>
      <Head>
        <title>COVID-19 | Global</title>
      </Head>
      <Layout>
        <GlobalData />
      </Layout>
    </>
  );
}
