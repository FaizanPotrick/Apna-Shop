import db from "../../../utils/db";
import Product from "../../../models/Product";

db();

export default async (req, res) => {
  const { method } = req;
  const { category } = req.query;
  switch (method) {
    case "POST":
      try {
        await Product.create(req.body);
        res.send("Successfully added");
      } catch (error) {
        res.status(400).send(error);
      }
      break;
    case "GET":
      const response = await Product.find({
        category: category,
      }).lean();
      res.send(response);
      break;
  }
};
