import db from "../../utils/db";
import Cart from "../../models/Cart";
import Product from "../../models/Product";

db();

export default async (req, res) => {
  const { method } = req;
  const { quantity, product_id } = req.body;
  const { user_id } = req.cookies;
  switch (method) {
    case "GET":
      const response = await Cart.aggregate([
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
        const product_response = await Product.findById(product_id).lean();
        if (product_response.stock === 0)
          return res.status(400).send("Out of Stock");
        const cart_response = await Cart.findOne({
          user_id,
          product_id,
        });
        if (cart_response !== null) {
          if (cart_response.quantity + parseInt(quantity) > 5)
            return res.status(400).send("Can't add more than 5 quantity");
          await Cart.findOneAndUpdate(
            { user_id, product_id },
            {
              $set: {
                quantity: cart_response.quantity + parseInt(quantity),
              },
            }
          );
          return res.send("Item Added Successfully");
        }
        await Cart.create({
          user_id,
          product_id,
          quantity,
        });
        res.send("Item Added Successfully");
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
    case "PUT":
      try {
        await Cart.findOneAndUpdate(
          { user_id, product_id },
          {
            $set: { quantity: quantity },
          }
        );
        res.send();
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
    case "DELETE":
      try {
        const { product_id } = req.query;
        await Cart.findOneAndRemove({ user_id, product_id });
        res.end();
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
  }
};
