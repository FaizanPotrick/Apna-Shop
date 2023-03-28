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
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide address id"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    payment: {
      mode: {
        type: String,
        required: [true, "Please provide payment mode"],
      },
      status: {
        type: String,
        required: [true, "Please provide payment status"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
