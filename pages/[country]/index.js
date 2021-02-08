import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";
// import { useRouter } from "next/router";

export default function CountryPage({ data }) {
  // const router = useRouter();
  return (
    <>
      <Head>
        <title>COVID-19 | Global</title>
      </Head>
      <Layout>
        <CountryData fixed data={data} />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const country =
    context.params.country === "Taiwan" ? "Taiwan*" : context.params.country;
  const url = `https://api-covid-stats.herokuapp.com/api/stats/country/${country}`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const url = `https://api-covid-stats.herokuapp.com/api/stats/latest`;
  const res = await fetch(url);
  const data = await res.json();

  const paths = data.stats.map((stat) => {
    return {
      params: {
        country: stat.country === "Taiwan*" ? "Taiwan" : stat.country,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
