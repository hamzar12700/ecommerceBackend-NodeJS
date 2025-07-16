import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
  await mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

export default connectDb;
