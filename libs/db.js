import mongoose from "mongoose";

const mongoUri =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URI_DEV
    : process.env.DB_URI;

export const connectDb = async () => {
  if (mongoose.connections?.[0].readyState) return;

  try {
    const connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    if (connection) {
      console.log(
        "MongoDB connected to: ",
        mongoose.connections[0].host.split(".")[0]
      );
    } else {
      console.warn("Mongoose connection failed!");
    }
  } catch (error) {
    console.warn("Mongoose connection error: ", error);
  }
};
