import db from "../../utils/db";
import Address from "../../models/Address";
import Cart from "../../models/Cart";
import UnderProcess from "../../models/UnderProcess";
import Order from "../../models/Order";

db();

export default async (req, res) => {
  const { method } = req;
  const {
    auth,
    cart,
    quantity,
    shippingAddress,
    paymentMode,
    paymentStatus,
    deliveryCharge,
  } = req.body;
  const { token } = req.query;
  switch (method) {
    case "GET":
      try {
        const underProcess = await UnderProcess.find({ auth: token });
        const address = await Address.find({ auth: token });
        if (underProcess.length === 0) {
          return res.status(401).json({
            success: false,
          });
        }
        if (underProcess[0].underProcess.length === 0) {
          return res.status(401).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          address: address[0].address,
          underProcess: underProcess[0].underProcess,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
    case "POST":
      try {
        const myCart = await Cart.find({ auth: auth });
        const orderId = `${Math.floor(Math.random() * 1000 + 1)}-${Math.floor(
          Math.random() * 10000000 + 1
        )}-${Math.floor(Math.random() * 10000000 + 1)}`;
        const today = new Date();
        myCart[0].cart.map(async (e) => {
          try {
            await Order.updateMany(
              { auth: auth },
              {
                $push: {
                  order: {
                    id: e.id,
                    orderId: orderId,
                    productName: e.productName,
                    quantity: e.quantity,
                    category: e.category,
                    subCategory: e.subCategory,
                    address: {
                      street: shippingAddress.street,
                      landMark: shippingAddress.landMark,
                      city: shippingAddress.city,
                      district: shippingAddress.district,
                      state: shippingAddress.state,
                      country: shippingAddress.country,
                      pinCode: shippingAddress.pinCode,
                    },
                    price:
                      e.price -
                      e.price * (e.discount / 100) +
                      parseInt(deliveryCharge),
                    seller: e.seller,
                    paymentMode: paymentMode,
                    paymentStatus: paymentStatus,
                    productImage: e.productImage,
                    bookOn: today,
                    deliveredOn: new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate() + 5,
                      today.getHours(),
                      today.getMinutes(),
                      today.getSeconds()
                    ),
                  },
                },
              }
            );
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: "Invalid Request! Please try later",
            });
          }
        });
        await Cart.updateOne(
          { auth: auth },
          {
            $set: { cart: [] },
          }
        );
        await UnderProcess.updateOne(
          { auth: auth },
          {
            $set: { underProcess: [] },
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
    case "PUT":
      try {
        await UnderProcess.updateOne(
          { auth: auth },
          {
            $set: {
              underProcess: [],
            },
          }
        );
        cart.map(async (e) => {
          try {
            await UnderProcess.updateOne(
              { auth: auth },
              {
                $push: {
                  underProcess: {
                    id: e.id,
                    productName: e.productName,
                    quantity: e.quantity,
                    discount: e.discount,
                    price: e.price,
                    productImage: e.productImage,
                  },
                },
              }
            );
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: "Invalid Request! Please try later",
            });
          }
        });
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
        await UnderProcess.updateOne(
          { auth: auth },
          {
            $set: {
              underProcess: [],
            },
          }
        );

        await UnderProcess.updateOne(
          { auth: auth },
          {
            $push: {
              underProcess: [
                {
                  id: cart._id,
                  productName: cart.productName,
                  quantity: quantity,
                  discount: cart.discount,
                  price: cart.price,
                  productImage: cart.productimage,
                },
              ],
            },
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
