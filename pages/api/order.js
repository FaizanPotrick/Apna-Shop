import db from "../../utils/db";
import Order from "../../models/Order";

db();

export default async (req, res) => {
  const { method } = req;
  const { user_id } = req.body;

  switch (method) {
    case "GET":
      try {
        const response = await Order.find({ user_id }).lean();
        res.send(response[0].order);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
      break;
  }
};
