import db from "../../utils/db";
import Products from "../../models/Products";

db("ProductDetails");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const response1 = await Products.find({ discount: 90 });
        const response2 = await Products.find({
          discount: { $gt: 60, $lt: 80 },
        });
        res
          .status(200)
          .json({ success: true, response1: response1, response2: response2 });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
  }
};
