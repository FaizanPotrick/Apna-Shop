import db from "../../../utils/db";
import fs from "fs";
import path from "path";

db();

export default async (req, res) => {
  const { file } = req.query;
  const filePath = path.resolve(".", `product_recommendation/${file}`);
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
};
