import db from "../../utils/db";
import Products from "../../models/Product";
import test_model from "../../product_recommendation/test_model";
import Order from "../../models/Order";

db();

export default async (req, res) => {
  const { user_id } = req.cookies;
  if (!user_id) {
    const product_ids = await test_model("laptop");
    const response = await Products.find({
      _id: { $in: product_ids },
    }).lean();
    return res.json(response);
  }
  const order_response = await Order.find({ user_id }).lean();
  if (order_response.length === 0) {
    const product_ids = await test_model("fashion");
    const response = await Products.find({
      _id: { $in: product_ids },
    }).lean();
    return res.json(response);
  }
  const product_index = Math.floor(Math.random() * order_response.length);
  const product_name = await Products.findOne({
    _id: order_response[product_index].product_id,
  }).lean();
  const product_ids = await test_model(
    product_name.category
  );
  const response = await Products.find({
    _id: { $in: product_ids },
  }).lean();
  res.json(response);
};
