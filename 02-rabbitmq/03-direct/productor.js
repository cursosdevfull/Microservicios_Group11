const amqp = require("amqplib");
const args = process.argv.slice(2); //node productor "mensaje" "routing key"

async function start() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-direct";
  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const message = args.length > 0 ? args[0] : "message by default";
  const routingKey = args.length > 1 ? args[1] : "key";

  console.log(message, routingKey);

  channel.publish(exchangeName, routingKey, Buffer.from(message));

  setTimeout(() => {
    connection.close();
    process.exit(1);
  }, 2000);
}

start();
