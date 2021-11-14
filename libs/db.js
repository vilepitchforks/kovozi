import mongoose from "mongoose";

const mongoUri =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URI_DEV
    : process.env.DB_URI;

let readyState;

export const connectDb = async () => {
  if (readyState) return;

  try {
    const connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`readyState: `, readyState);

    if (connection) {
      console.log(
        "MongoDB connected to: ",
        mongoose.connections[0].host.split(".")[0]
      );

      readyState = connection.connections[0].readyState;
    } else {
      console.warn("Mongoose connection failed!");
    }
  } catch (error) {
    console.warn("Mongoose connection error: ", error);
  }
};
