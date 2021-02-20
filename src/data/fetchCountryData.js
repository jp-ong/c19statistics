import Stat from "models/Stat";
import connectDB from "./connectDB";
import { PROJECT } from "./dataProject";

const fetchCountryData = async (country) => {
  await connectDB();
  const stats = await Stat.find({ country }, PROJECT, { sort: { date: -1 } });

  return { data: JSON.parse(JSON.stringify(stats)) };
};

export default fetchCountryData;
