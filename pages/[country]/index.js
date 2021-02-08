import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import CountryData from "components/CountryData";

export default function CountryPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>COVID-19 | Global</title>
      </Head>
      <Layout>
        <CountryData country={router.query.country} fixed />
      </Layout>
    </>
  );
}
