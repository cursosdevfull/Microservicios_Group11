const amqp = require("amqplib");
const args = process.argv.slice(2);

async function start() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-topic";
  await channel.assertExchange(exchangeName, "topic", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  const routingKeys = args.length > 0 ? args : ["key"];

  const listBindings = [];

  for (const routingKey of routingKeys) {
    listBindings.push(
      channel.bindQueue(assertQueue.name, exchangeName, routingKey)
    );
  }

  Promise.all(listBindings).then(() => {
    channel.consume(
      assertQueue.queue,
      (message) => console.log(message.content.toString()),
      { noAck: false }
    );
  });
}

start();
