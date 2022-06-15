const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
    },
    order: [
      {
        id: {
          type: String,
          required: true,
        },
        orderId: {
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
        address: {
          street: {
            type: String,
            required: true,
            maxlength: 100,
          },
          landMark: {
            type: String,
            required: true,
            maxlength: 100,
          },
          city: {
            type: String,
            required: true,
            maxlength: 20,
          },
          district: {
            type: String,
            required: true,
            maxlength: 20,
          },
          state: {
            type: String,
            required: true,
            maxlength: 20,
          },
          country: {
            type: String,
            required: true,
            maxlength: 20,
          },
          pinCode: {
            type: String,
            required: true,
            maxlength: 10,
            minLength: 6,
          },
        },
        price: {
          type: Number,
          required: true,
        },
        seller: {
          type: String,
          maxlength: 200,
        },
        paymentMode: {
          type: String,
          required: true,
        },
        paymentStatus: {
          type: String,
          required: true,
        },
        productImage: {
          type: String,
          required: true,
        },
        bookOn: {
          type: Date,
          required: true,
        },
        deliveredOn: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const myDB = mongoose.connection.useDb("UserDetails");
module.exports = myDB.model("Order", OrderSchema);
