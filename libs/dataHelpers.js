import { format, startOfWeek, endOfWeek } from "date-fns";

import Day from "../models/day.js";

export const getIdemVozimTkoIde = async (req, res) => {
  const start = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const end = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  //   connectDb();

  try {
    // Check if user exists and render the user
    let fetchedData = await Day.find({
      day: { $gte: start, $lte: end }
    })
      .select("day drives goes")
      .populate("drives goes", "name pictures");

    let data = JSON.parse(JSON.stringify(fetchedData));

    let idemDanas = false,
      vozimDanas = false,
      danasIdu = [];

    data.forEach(day => {
      if (day.day === format(new Date(), "yyyy-MM-dd")) {
        danasIdu = day.goes;

        day.goes.forEach(goingUser => {
          if (goingUser._id === req.userId) idemDanas = true;
        });

        day.drives.forEach(drivingUser => {
          if (drivingUser._id === req.userId) vozimDanas = true;
        });
      }
    });

    return { idemDanas, vozimDanas, danasIdu };
  } catch (error) {
    console.warn("Error fetching IdemVozimTkoIde data: ", error);
    return false;
  }
};

export const getTrenutnoVozi = async () => {
  const start = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const end = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  try {
    const trenutnoVoziDocs = await Day.aggregate([
      {
        $match: {
          day: { $gte: start, $lte: end }
        }
      },
      { $project: { day: 1, drives: 1 } },
      {
        $lookup: {
          from: "users",
          localField: "drives",
          foreignField: "_id",
          as: "drives",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                pictures: {
                  small: { url: 1 },
                  normal: { url: 1 },
                  large: { url: 1 }
                }
              }
            }
          ]
        }
      },
      { $unwind: "$drives" }
    ]);

    const trenutnoVozi = JSON.parse(JSON.stringify(trenutnoVoziDocs));

    return trenutnoVozi;
  } catch (error) {
    console.warn("Error while fetching TrenutnoVozi data: ", error.message);
    return false;
  }
};
