import connectDB from "./connectDB";
import Stat from "models/Stat";

const fetchLatestEntry = async () => {
  await connectDB();

  const latest = await Stat.findOne({}, { date: 1 }, { sort: { date: -1 } });

  return JSON.parse(JSON.stringify(latest));
};

export default fetchLatestEntry;
