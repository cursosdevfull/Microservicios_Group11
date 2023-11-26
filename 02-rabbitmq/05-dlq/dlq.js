const amqp = require("amqplib");

async function start() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeNameDLQ = "exchange-dlq";
  await channel.assertExchange(exchangeNameDLQ, "direct", { durable: true });

  const routingKey = "";

  const queueNameDQL = "queueDLQ";
  await channel.assertQueue(queueNameDQL);

  await channel.bindQueue(queueNameDQL, exchangeNameDLQ, routingKey);

  channel.consume(
    queueNameDQL,
    (message) => {
      console.log("message DLQ", message.content.toString());
      channel.ack(message);
    },
    { noAck: false }
  );
}

start();
