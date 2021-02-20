import Stat from "models/Stat";
import connectDB from "./connectDB";
import fetchLatestEntry from "./fetchLatestEntry";
import { PROJECT } from "./dataProject";

const fetchGlobalData = async (queryDate) => {
  await connectDB();
  const { date } = queryDate || (await fetchLatestEntry());

  const stats = await Stat.find(
    { $and: [{ date: new Date(date) }, { country_code: { $ne: [] } }] },
    PROJECT,
    {
      sort: { confirmed: -1 },
    }
  );

  return { data: JSON.parse(JSON.stringify(stats)) };
};

export default fetchGlobalData;
