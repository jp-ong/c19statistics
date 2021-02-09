import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState > 0) {
    return;
  }

  return await mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
