import db from "../../utils/db";
import Cart from "../../models/Cart";

db();

export default async (req, res) => {
  const { method } = req;
  const {
    auth,
    id,
    productName,
    quantity,
    category,
    subCategory,
    discount,
    price,
    seller,
    avaliability,
    productImage,
  } = req.body;
  const { token } = req.query;
  switch (method) {
    case "GET":
      try {
        const response = await Cart.find({ auth: token });
        if (response.length === 0) {
          return res.status(401).json({
            success: false,
          });
        }
        res.status(200).json({ success: true, response: response[0].cart });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
      break;
    case "POST":
      try {
        const response = await Cart.find({
          auth: auth,
          "cart.id": id,
        });
        if (avaliability === 0) {
          return res
            .status(201)
            .json({ success: false, message: "Out of Stock" });
        }
        if (response.length !== 0) {
          try {
            if (response[0].cart[0].quantity + parseInt(quantity) > 5) {
              return res.status(201).json({
                success: false,
                message: "Can't add more than 5 quantity",
              });
            }
            await Cart.updateOne(
              { auth: auth, "cart.id": id },
              {
                $set: {
                  "cart.$.quantity":
                    response[0].cart[0].quantity + parseInt(quantity),
                },
              }
            );
            return res
              .status(200)
              .json({ success: true, message: "Item Added Successfully" });
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: "Invalid Request! Please try later",
            });
          }
        }

        await Cart.updateOne(
          { auth: auth },
          {
            $push: {
              cart: {
                id: id,
                productName: productName,
                quantity: quantity,
                category: category,
                subCategory: subCategory,
                discount: discount,
                price: price,
                seller: seller,
                productImage: productImage,
              },
            },
          }
        );
        res
          .status(200)
          .json({ success: true, message: "Item Added Successfully" });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Invalid Request! Please try later",
        });
      }
      break;
    case "PUT":
      try {
        await Cart.updateOne(
          { auth: auth, "cart.id": id },
          {
            $set: { "cart.$.quantity": quantity },
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
    case "DELETE":
      try {
        await Cart.updateOne(
          { auth: auth },
          {
            $pull: { cart: { id: id } },
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
