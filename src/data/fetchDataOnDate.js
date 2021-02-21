import Stat from "models/Stat";
import connectDB from "./connectDB";
import { PROJECT } from "./dataProject";

const fetchDataOnDate = async (date) => {
  await connectDB();

  const stats = await Stat.find({ date }, PROJECT, { sort: { confirmed: -1 } });

  return { data: JSON.parse(JSON.stringify(stats)) };
};

export default fetchDataOnDate;
