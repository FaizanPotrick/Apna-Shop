const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
    },
    address: [
      {
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
    ],
  },
  { timestamps: true }
);
const myDB = mongoose.connection.useDb("UserDetails");
module.exports = myDB.model("Address", AddressSchema);
