import db from "../../utils/db";
import Products from "../../models/Product";

db();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const response = await Products.find({
        discount: { $gt: 70, $lt: 90 },
      });
      res.json(response);
      break;
  }
};
