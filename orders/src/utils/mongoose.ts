import mongoose from "mongoose";

export async function mongooseConnect() {
  mongoose
    .connect("mongodb://orders-mongo:27017/orders")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}
