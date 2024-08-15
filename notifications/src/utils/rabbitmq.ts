import amqplib from "amqplib";

export async function rabbitmqConnection() {
  const queue = "notifications";
  const connection = await amqplib.connect("amqp://rabbitmq");

  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  return channel;
}

export async function startConsuming() {
  const queue = "notifications";
  const channel = await rabbitmqConnection();
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log("Receive new order", data);
      channel.ack(msg);
    }
  });
}
