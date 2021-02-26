import Layout from "components/layout";
import fetchCountryData from "src/data/fetchCountryData";
import fetchCountryList from "src/data/fetchCountryList";
import { useRouter } from "next/router";
import Head from "next/head";
import CountryData from "components/CountryData";

const CountryPage = ({ data, prevCountry, nextCountry }) => {
  const router = useRouter();
  const { country } = router.query;
  return (
    <>
      <Head>
        <title>{country} Statistics for COVID-19 Cases</title>
        <meta
          name="keywords"
          content={`${country}, history, summary, average, cases, covid19, daily, covid-19, global, statistics, confirmed, deaths, recovered, population, timeline`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`https://c19statistics.vercel.app/${country}`}
        />
      </Head>
      <Layout>
        <CountryData
          data={data}
          country={country}
          prevCountry={prevCountry}
          nextCountry={nextCountry}
        />
      </Layout>
    </>
  );
};

export default CountryPage;

export async function getStaticProps(context) {
  const { country } = context.params;
  const { data } = await fetchCountryData(
    country === "Taiwan" ? "Taiwan*" : country
  );
  const { countries } = await fetchCountryList();
  const cIndex = countries.indexOf(country);

  return {
    props: {
      data: formatData(data),
      prevCountry: countries[cIndex - 1] || -1,
      nextCountry: countries[cIndex + 1] || -1,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const { countries } = await fetchCountryList();

  const paths = countries.map((country) => {
    return {
      params: {
        country,
      },
    };
  });

  return { paths, fallback: false };
}

const formatData = (data) => {
  const columns = [
    { field: "id", headerName: "Index", width: 100, type: "number" },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      type: "date",
    },
    { field: "confirmed", headerName: "Confirmed", width: 150, type: "number" },
    { field: "deaths", headerName: "Deaths", width: 150, type: "number" },
    { field: "recovered", headerName: "Recovered", width: 150, type: "number" },
    {
      field: "confirmed_daily",
      headerName: "Daily Confirmed",
      width: 170,
      type: "number",
    },
    {
      field: "deaths_daily",
      headerName: "Daily Deaths",
      width: 170,
      type: "number",
    },
    {
      field: "recovered_daily",
      headerName: "Daily Recovered",
      width: 170,
      type: "number",
    },
  ];

  const rows = data.map(
    (
      {
        date,
        confirmed,
        deaths,
        recovered,
        confirmed_daily,
        deaths_daily,
        recovered_daily,
      },
      index
    ) => {
      return {
        id: index + 1,
        date: new Date(date).toJSON().slice(0, 10),
        confirmed,
        deaths,
        recovered,
        confirmed_daily,
        deaths_daily,
        recovered_daily,
      };
    }
  );

  return { columns, rows };
};
