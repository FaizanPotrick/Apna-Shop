const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide user id"],
    },
    order_id: {
      type: String,
      required: [true, "Please provide order id"],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide product id"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
