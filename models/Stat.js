import mongoose, { Schema } from "mongoose";

const StatSchema = Schema(
  {
    date: Date,
    country: String,
    population: Number,
    confirmed: Number,
    deaths: Number,
    recovered: Number,
    confirmed_daily: Number,
    deaths_daily: Number,
    recovered_daily: Number,
  },
  { bufferCommands: false, autoCreate: false }
);

export default mongoose.models.Stat ||
  mongoose.model("Stat", StatSchema, "countries_summary");
