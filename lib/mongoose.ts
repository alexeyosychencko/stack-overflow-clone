import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    return console.log("MONGO_URL not found");
  }

  if (isConnected) {
    return console.log("=> using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "CodeFlow"
    });
    isConnected = true;
    console.log("=> using new database connection");
  } catch (err) {
    console.log(err, "=> error connecting to database");
  }
};
