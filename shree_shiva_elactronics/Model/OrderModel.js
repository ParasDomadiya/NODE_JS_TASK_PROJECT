const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  productName: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    // required: true
  },
  number: {
    type: Number,
    // required: true
  },

  pincode: {
    type: String,
    // required: true
  },
  total: {
    type: Number,
    // required: true
  },
  subTotal: {
    type: Number,
    // required: true
  },
  area: {
    type: String,
    // required: true
  },
  quantity: {
    type: Number,
  },
  month: {
   type: Number
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customerdata",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
