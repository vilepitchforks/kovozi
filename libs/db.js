import mongoose from "mongoose";

const { _readyState, _hasOpened } = mongoose.connections[0];

export const connectDb = async () => {
  if (!_readyState && !_hasOpened) {
    try {
      const connection = await mongoose.connect(process.env.DB_URI, {
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
