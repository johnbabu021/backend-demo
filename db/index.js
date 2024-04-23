import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function connect() {
  const connectdb = () => {
    mongoose
      .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
      .then(() => {
        console.log("MONGODB CONNECTED...");
      })
      .catch((err) => {});
  };
  connectdb();
  mongoose.connection.on("disconnected", connectdb);
}
