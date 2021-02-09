import Head from "next/head";
import Layout from "components/Layout";
import CountryData from "components/CountryData";
import { useRouter } from "next/router";

export default function CountryPage({ data }) {
  const router = useRouter();
  const { country } = router.query;
  return (
    <>
      <Head>
        <title>{country} | COVID-19 Statistical Summary</title>
        <meta
          name="keywords"
          content={`covid-19, ${country}, summary, statistics, confirmed, deaths, recovered, population`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout summary>
        <CountryData fixed data={data} />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const country =
    context.params.country === "Taiwan" ? "Taiwan*" : context.params.country;
  const url = `https://api-covid-stats.herokuapp.com/api/stats/country/${encodeURIComponent(
    country
  )}`;
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
