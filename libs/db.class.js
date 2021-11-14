import mongoose from "mongoose";

import { getAuthUser } from "./authHelpers";
import {
  getIdemVozimTkoIde,
  getTrenutnoVozi,
  getRaspored,
  getKalendar
} from "./dataHelpers";

const mongoUri =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URI_DEV
    : process.env.DB_URI;

class DB {
  constructor() {
    (async () => {
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
    })();
  }

  async getAuthUser(req, res) {
    return await getAuthUser(req, res);
  }

  async getIdemVozimTkoIde(req, res) {
    return await getIdemVozimTkoIde(req, res);
  }

  async getTrenutnoVozi() {
    return await getTrenutnoVozi();
  }

  async getRaspored() {
    return await getRaspored();
  }

  async getKalendar() {
    return await getKalendar();
  }
}

export default new DB();
