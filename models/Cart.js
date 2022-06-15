const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
    },
    cart: [
      {
        id: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
          maxlength: 200,
        },
        subCategory: {
          type: String,
          required: true,
          maxlength: 200,
        },
        discount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        seller: {
          type: String,
          required: true,
          maxlength: 200,
        },
        productImage: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const myDB = mongoose.connection.useDb("UserDetails");
module.exports = myDB.model("Cart", CartSchema);
