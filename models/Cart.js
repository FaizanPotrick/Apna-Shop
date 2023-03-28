const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide user id"],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide product id"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
