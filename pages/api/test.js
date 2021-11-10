import { getRaspored } from "../../libs/dataHelpers";

export default async function handler(req, res) {
  const raspored = await getRaspored();
  res.status(200).json({ name: "John Doe", raspored });
}
