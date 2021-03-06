import { format } from "date-fns";

import { connectDb } from "./db.js";

import Day from "../models/day.js";

import { startEndRange } from "./dateFormat.js";

const { startOf, endOf } = startEndRange;

export const getIdemVozimTkoIde = async (req, res) => {
  try {
    console.log("Connecting to DB to fetch IdemVozimTkoIde data...");
    await connectDb();

    // Check if user exists and render the user
    let fetchedData = await Day.find({
      day: { $gte: startOf.week, $lte: endOf.week }
    })
      .select("day drives goes")
      .populate("drives goes", "name pictures");

    let data = JSON.parse(JSON.stringify(fetchedData));

    let idemDanas = false,
      vozimDanas = false,
      tkoIde = [];

    data.forEach(day => {
      if (day.day === format(new Date(), "yyyy-MM-dd")) {
        tkoIde = day.goes;

        day.goes.forEach(goingUser => {
          if (goingUser._id === req.userId) idemDanas = true;
        });

        day.drives.forEach(drivingUser => {
          if (drivingUser._id === req.userId) vozimDanas = true;
        });
      }
    });

    return { idemDanas, vozimDanas, tkoIde };
  } catch (error) {
    console.warn("Error fetching IdemVozimTkoIde data: ", error);
    return false;
  }
};

export const getTkoVozi = async () => {
  try {
    console.log("Connecting to DB to fetch TkoVozi data...");
    await connectDb();

    const trenutnoVoziDocs = await Day.aggregate([
      {
        $match: {
          day: { $gte: startOf.week, $lte: endOf.week }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "drives",
          foreignField: "_id",
          as: "drives"
        }
      },
      { $unwind: "$drives" },
      {
        $project: {
          day: 1,
          drives: {
            name: 1,
            pictures: {
              small: { url: 1 },
              normal: { url: 1 },
              large: { url: 1 }
            }
          }
        }
      }
    ]);

    const trenutnoVozi = JSON.parse(JSON.stringify(trenutnoVoziDocs));

    return trenutnoVozi;
  } catch (error) {
    console.warn("Error while fetching TrenutnoVozi data: ", error.message);
    return false;
  }
};

export const getRaspored = async () => {
  try {
    console.log("Connecting to DB to fetch Raspored data...");
    await connectDb();

    const rasporedDocs = await Day.aggregate([
      {
        $match: {
          day: { $gte: startOf.month, $lte: endOf.month }
        }
      },
      { $unwind: "$drives" },
      { $sort: { drives: 1 } },
      {
        $group: {
          _id: "$drives",
          days: { $push: "$day" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          days: 1,
          user: {
            name: 1,
            pictures: {
              small: { url: 1 },
              normal: { url: 1 },
              large: { url: 1 }
            }
          }
        }
      }
    ]);

    const raspored = JSON.parse(JSON.stringify(rasporedDocs));

    return raspored;
  } catch (error) {
    console.warn("Error while fetching Raspored data: ", error.message);
    return false;
  }
};

export const getKalendar = async () => {
  try {
    console.log("Connecting to DB to fetch Kalendar data...");
    await connectDb();

    const kalendarDocs = await Day.aggregate([
      {
        $match: {
          day: { $gte: startOf.month, $lte: endOf.month }
        }
      },
      { $unwind: "$drives" },
      { $project: { drives: 1, day: 1 } },
      {
        $lookup: {
          from: "users",
          localField: "drives",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          day: 1,
          user: {
            name: 1,
            pictures: {
              small: { url: 1 },
              normal: { url: 1 },
              large: { url: 1 }
            }
          }
        }
      }
    ]);

    const kalendar = JSON.parse(JSON.stringify(kalendarDocs));

    return kalendar;
  } catch (error) {
    console.warn("Error while fetching Kalendar data: ", error.message);
    return false;
  }
};
