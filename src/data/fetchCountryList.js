import Stat from "models/Stat";
import connectDB from "./connectDB";
import fetchLatestEntry from "./fetchLatestEntry";

const fetchCountryList = async () => {
  await connectDB();
  const { date } = await fetchLatestEntry();

  const countries = await Stat.find(
    { date: new Date(date) },
    { country: 1 },
    { sort: { country: 1 } }
  );

  return {
    countries: JSON.parse(JSON.stringify(countries)).map(({ country }) =>
      country === "Taiwan*" ? "Taiwan" : country
    ),
  };
};

export default fetchCountryList;
