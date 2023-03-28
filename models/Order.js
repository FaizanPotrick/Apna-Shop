const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
const myDB = mongoose.connection.useDb("UserDetails");
module.exports = myDB.model("Order", OrderSchema);
