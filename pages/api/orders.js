import db from "../../utils/db";
import Order from "../../models/Order";

db();

export default async (req, res) => {
  const { method } = req;
  const { auth, id } = req.body;
  const { token } = req.query;

  switch (method) {
    case "GET":
      try {
        const response = await Order.find({ auth: token });
        if (response.length === 0) {
          res.status(401).json({ success: false });
        }
        res.status(200).json({ success: true, response: response[0].order });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
    case "DELETE":
      try {
        await Order.updateOne(
          { auth: auth },
          {
            $pull: { order: { _id: id } },
          }
        );
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Invalid Request! Please try later",
        });
      }
      break;
  }
};
