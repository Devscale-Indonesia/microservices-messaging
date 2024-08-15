import express from "express";
import * as orderRepositories from "./repositories/order.repositories";
import { rabbitmqConnection } from "./utils/rabbitmq";
import { mongooseConnect } from "./utils/mongoose";

mongooseConnect();

const app = express();
app.use(express.json());

app.get("/", async (_, res) => {
  const orders = await orderRepositories.getAllOrders();
  return res.json({ orders });
});

app.post("/", async (req, res) => {
  const { productName, price } = req.body;
  const order = await orderRepositories.createOrder(productName, price);

  const queue = "notifications";
  const channel = await rabbitmqConnection();

  const data = {
    type: "newOrder",
    payload: {
      id: order._id,
      productName: order.productName,
      price: order.price,
    },
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  console.log(`Sent order notification to queue ${queue}`);

  return res.json({ order });
});

app.listen(8010, () => console.log("Orders Services Listening on port 8010"));
