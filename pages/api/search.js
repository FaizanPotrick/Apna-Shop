import db from "../../utils/db";
import Products from "../../models/Products";

db();

export default async (req, res) => {
  const { method } = req;
  const { searching } = req.query;
  switch (method) {
    case "GET":
      try {
        const response1 = await Products.find({
          category: { $regex: `${searching}`, $options: "i" },
        });
        const response2 = await Products.find({
          subcategory: { $regex: `${searching}`, $options: "i" },
        });
        const response3 = await Products.find({
          productName: { $regex: `${searching}`, $options: "i" },
        });
        res.status(200).json({
          success: true,
          response1: response1,
          response2: response2,
          response3: response3,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
  }
};
