import dotenv from "dotenv";

import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config();
const serverBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    const listPromises = [];
    listPromises.push(serverBootstrap.init());

    await Promise.all(listPromises);

    console.log("Servers initialized");
  } catch (error) {
    console.log(error);
    serverBootstrap.close();
  }
})();
