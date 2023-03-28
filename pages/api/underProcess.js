import db from "../../utils/db";
import Cart from "../../models/Cart";
import Order from "../../models/Order";

db();

export default async (req, res) => {
  const { method } = req;
  const { auth, payment, deliveryCharge, address_id, user_id } = req.body;

  switch (method) {
    case "POST":
      try {
        const cart_response = await Cart.find({ user_id });
        const order_id = `${Math.floor(Math.random() * 1000 + 1)}-${Math.floor(
          Math.random() * 10000000 + 1
        )}-${Math.floor(Math.random() * 10000000 + 1)}`;
        cart_response.map(async (e) => {
          await Order.updateMany(
            { auth: auth },
            {
              $push: {
                user_id,
                order_id,
                product_id: e.product_id,
                quantity: e.quantity,
                address_id,
                price:
                  e.price -
                  e.price * (e.discount / 100) +
                  parseInt(deliveryCharge),
                payment: payment,
              },
            }
          );
        });
        await Cart.remove({ user_id });
        res.end();
      } catch (error) {
        res.status(400).send("Invalid Request");
      }
      break;
  }
};
