import db from "../../utils/db";
import Cart from "../../models/Cart";

db();

export default async (req, res) => {
  const { method } = req;
  const { quantity, user_id, product_id } = req.body;
  switch (method) {
    case "GET":
      try {
        const response = await Cart.find({ user_id }).lean();
        res.send(response);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
      break;
    case "POST":
      try {
        const product_response = await Product.findById(product_id).lean();
        if (product_response.avaliability === 0)
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
                quantity: response.quantity + parseInt(quantity),
              },
            }
          );
          return res.send("Item Added Successfully");
        }
        await Cart.create({
          user_id,
          product_id,
        });
        res.send("Item Added Successfully");
      } catch (error) {
        res.status(400).send("Invalid Request");
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
        res.end();
      } catch (error) {
        res.status(400).send("Invalid Request");
      }
      break;
    case "DELETE":
      try {
        await Cart.findOneAndRemove({ user_id, product_id });
        res.end();
      } catch (error) {
        res.status(400).send("Invalid Request");
      }
      break;
  }
};
