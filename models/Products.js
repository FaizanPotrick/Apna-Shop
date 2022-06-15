const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    maxlength: 200,
  },
  subcategory: {
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
  buyer: {
    type: String,
    required: true,
    maxlength: 200,
  },
  avaliability: {
    type: Number,
    required: true,
  },
  productimage: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
