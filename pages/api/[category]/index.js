import db from "../../../utils/db";
import Products from "../../../models/Products";

db();

export default async (req, res) => {
  const { method } = req;
  const { category } = req.query;
  switch (method) {
    case "POST":
      try {
        const response = await Products.create(req.body);
        res.status(200).json({ success: true, response: response });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const response = await Products.find({
          category: category,
        });
        if (response.length === 0) {
          res.status(404).json({
            success: false,
            message: "Page not found",
          });
        }
        res.status(200).json({ success: true, response: response });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }

      break;
  }
};
