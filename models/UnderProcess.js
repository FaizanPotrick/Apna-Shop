const mongoose = require("mongoose");

const UnderProcessSchema = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
    },
    underProcess: [
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
        discount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
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
module.exports = myDB.model("UnderProcess", UnderProcessSchema);
