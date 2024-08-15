import { Order } from "./models/orders";

export async function getAllOrders() {
  return await Order.find();
}

export async function createOrder(productName: string, price: number) {
  const order = new Order({ productName, price });
  return order.save();
}
