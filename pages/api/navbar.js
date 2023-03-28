import db from "../../utils/db";
import Register from "../../models/User";
import Cart from "../../models/Cart";

db();

export default async (req, res) => {
  const { method } = req;
  const { auth } = req.body;
  switch (method) {
    case "POST":
      if(!auth) {
        return res.status(201).json({
          success: false,
        });
      }
      const name = await Register.find({
        auth: auth,
      });
      const quantity = await Cart.find({
        auth: auth,
      });
      let quantities = 0;
      await quantity[0].cart.map((e) => {
        quantities = quantities + e.quantity;
      });
      res.status(200).json({
        success: true,
        name: `${name[0].fName} ${name[0].lName}`,
        quantity: quantities,
      });
      break;
  }
};
