const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  barcode: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Product", productSchema);
