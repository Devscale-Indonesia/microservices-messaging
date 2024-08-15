import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
});

export const Order = mongoose.model("Order", orderSchema);
