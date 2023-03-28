import db from "../../../../utils/db";
import Product from "../../../../models/Product";

db();

export default async (req, res) => {
  const { method } = req;
  const { product_id } = req.query;
  switch (method) {
    case "GET":
      const response = await Product.findById(product_id);
      res.send(response);
      break;
  }
};
