import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";
import { useRouter } from "next/router";

export default function CountryPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>COVID-19 | Global</title>
      </Head>
      <Layout>
        <CountryData fixed country={router.query.country} />
      </Layout>
    </>
  );
}
