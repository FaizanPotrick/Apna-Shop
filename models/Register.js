const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      minlength: 4,
    },
    mName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      minlength: 4,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      minlength: 4,
    },
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      length: 10,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    landMark: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    district: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    pinCode: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
      minLength: 6,
    },
    question1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    question2: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    cPassword: {
      type: String,
      minLength: 6,
      required: true,
    },
  },
  { timestamps: true }
);
const myDB = mongoose.connection.useDb("UserDetails");
module.exports = myDB.model("Register", RegisterSchema);
