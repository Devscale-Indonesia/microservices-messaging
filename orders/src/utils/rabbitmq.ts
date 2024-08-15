import amqplib from "amqplib";

export async function rabbitmqConnection() {
  const queue = "notifications";
  const connection = await amqplib.connect("amqp://rabbitmq");

  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  return channel;
}
