import mongoose from "mongoose";

const { _readyState, _hasOpened } = mongoose.connections[0];

export const connectDb = async () => {
  if (!_readyState && !_hasOpened) {
    try {
      const mongoUri =
        process.env.NODE_ENV === "development"
          ? process.env.DB_URI_DEV
          : process.env.DB_URI;

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
  }
};
