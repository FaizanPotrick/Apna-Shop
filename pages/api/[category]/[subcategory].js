import db from "../../../utils/db";
import Product from "../../../models/Product";

db();

export default async (req, res) => {
  const { method } = req;
  const { category, subcategory } = req.query;
  switch (method) {
    case "GET":
      const response = await Product.find({
        category: category,
        subcategory: subcategory,
      }).lean();
      res.send(response);
      break;
  }
};
