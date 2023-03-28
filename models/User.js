const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]+$/, (props) => `${props.value} is not a valid name`],
      minlength: 3,
      required: [true, "Name is required"],
    },
    email_address: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/,
        (props) => `${props.value} is not a valid email address`,
      ],
      required: [true, "Email address is required"],
      unique: true,
    },
    type_of_user: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["buyer", "seller"],
      match: [
        /^(buyer|seller)$/,
        (props) => `${props.value} is not a valid type of user`,
      ],
      required: [true, "Type of user is required"],
    },
    phone_number: {
      type: String,
      trim: true,
      length: 10,
      match: [
        /^[0-9]{10}$/,
        (props) => `${props.value} is not a valid phone number`,
      ],
      required: [true, "Phone number is required"],
    },
    gst_number: {
      type: String,
      trim: true,
      match: [
        /^[A-Za-z0-9]+$/,
        (props) => `${props.value} is not a valid GST number`,
      ],
      required: [true, "GST number is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
const User = mongoose.connection.useDb("UserDetails");
module.exports = User.model("Register", UserSchema);
