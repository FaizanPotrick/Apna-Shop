import db from "../../../utils/db";
import Product from "../../../models/Product";

db();

export default async (req, res) => {
  const { category, subcategory } = req.query;

  const response = await Product.find({
    category: category,
    subcategory: subcategory,
  }).lean();
  res.send(response);
};
