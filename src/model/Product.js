const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    available: {
      type: Boolean,
      default: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
