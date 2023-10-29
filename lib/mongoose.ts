import mongoose from "mongoose";

let db: mongoose.Connection;

export const connectToDb = async (): Promise<mongoose.Connection> => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }

  if (db) {
    console.log("=> using existing database connection");
    return db;
  }

  try {
    db = await mongoose
      .createConnection(process.env.MONGODB_URI, {
        dbName: "CodeFlow"
      })
      .asPromise();
    console.log("=> using new database connection");
    return db;
  } catch (err) {
    throw new Error(`=> error connecting to database, ${err}`);
  }
};
