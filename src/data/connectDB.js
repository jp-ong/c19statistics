import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState > 0) return;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(`New MongoDB connection established...`);
};

export default connectDB;
