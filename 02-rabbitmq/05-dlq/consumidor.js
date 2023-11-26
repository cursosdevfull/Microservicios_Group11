const amqp = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-direct";
  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const exchangeNameDLQ = "exchange-dlq";
  await channel.assertExchange(exchangeNameDLQ, "direct", { durable: true });

  const assertQueue = await channel.assertQueue("", {
    exclusive: true,
    deadLetterExchange: exchangeNameDLQ,
    deadLetterRoutingKey: "",
  });

  const routingKey = args.length > 0 ? args[0] : "key";
  await channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

  channel.consume(
    assertQueue.queue,
    (message) => {
      console.log("message", message.content.toString());
      if (message.content.toString() === "hola") {
        channel.reject(message, false);
      } else {
        channel.ack(message, true);
      }
      //channel.ack(message, true);
    },
    { noAck: false }
  );
}

start();
