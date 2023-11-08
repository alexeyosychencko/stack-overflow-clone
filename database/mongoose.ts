import _mongoose, { connect } from "mongoose";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDb() {
  if (cached.conn) {
    console.log("🚀 Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "CodeFlow"
    };

    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ New connection established");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connection to database failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDb;

// import mongoose from "mongoose";

// eslint-disable-next-line no-var
// var db: mongoose.Connection;

// const connectToDb = async (): Promise<mongoose.Connection> => {
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI not found");
//   }

//   if (db) {
//     console.log("=> using existing database connection");
//     return db;
//   }

//   try {
//     db = await mongoose
//       .createConnection(process.env.MONGODB_URI, {
//         dbName: "CodeFlow"
//       })
//       .asPromise();
//     console.log("=> using new database connection");
//     return db;
//   } catch (err) {
//     throw new Error(`=> error connecting to database, ${err}`);
//   }
// };

// export default connectToDb;
