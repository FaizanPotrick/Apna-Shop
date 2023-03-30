import db from "../../utils/db";
import Order from "../../models/Order";
import Cart from "../../models/Cart";

db();

export default async (req, res) => {
  const { method } = req;
  const { user_id } = req.cookies;
  switch (method) {
    case "GET":
      const response = await Order.aggregate([
        {
          $addFields: {
            user_id: { $toString: "$user_id" },
          },
        },
        {
          $match: { user_id },
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
      ]);
      res.send(response);
      break;
    case "POST":
      try {
        const cart_response = await Cart.aggregate([
          {
            $addFields: {
              user_id: { $toString: "$user_id" },
            },
          },
          {
            $match: { user_id },
          },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $unwind: "$product",
          },
        ]);
        const order_id = `${Math.floor(Math.random() * 1000 + 1)}-${Math.floor(
          Math.random() * 10000000 + 1
        )}-${Math.floor(Math.random() * 10000000 + 1)}`;
        cart_response.map(async (e) => {
          await Order.create({
            user_id,
            order_id,
            product_id: e.product_id,
            quantity: e.quantity,
            price:
              e.product.price - e.product.price * (e.product.discount / 100),
          });
        });
        await Cart.remove({ user_id });
        res.send();
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
  }
};
