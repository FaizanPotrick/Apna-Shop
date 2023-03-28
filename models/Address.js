const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user id"],
    },
    default: {
      type: Boolean,
      default: false,
    },
    street: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z0-9\s,.'-]{3,}$/, "Please add a valid street"],
      required: [true, "Please add a street"],
    },
    landMark: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z0-9\s,.'-]{3,}$/, "Please add a valid landmark"],
      required: [true, "Please add a landmark"],
    },
    city: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]{3,}$/, "Please add a valid city"],
      required: [true, "Please add a city"],
    },
    district: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]{3,}$/, "Please add a valid district"],
      required: [true, "Please add a district"],
    },
    state: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]{3,}$/, "Please add a valid state"],
      required: [true, "Please add a state"],
    },
    country: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]{3,}$/, "Please add a valid country"],
      required: [true, "Please add a country"],
    },
    pinCode: {
      type: String,
      trim: true,
      match: [/^[0-9]{6,}$/, "Please add a valid pin code"],
      required: [true, "Please add a pin code"],
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Address || mongoose.model("Address", AddressSchema);
