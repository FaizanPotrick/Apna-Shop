import db from "../../utils/db";
import Products from "../../models/Product";

db();

export default async (req, res) => {
  const { searching } = req.query;

  const response1 = await Products.find({
    category: { $regex: `${searching}`, $options: "i" },
  }).lean();
  const response2 = await Products.find({
    subcategory: { $regex: `${searching}`, $options: "i" },
  }).lean();
  const response3 = await Products.find({
    productName: { $regex: `${searching}`, $options: "i" },
  }).lean();
  res.send([...response1, ...response2, ...response3]);
};
