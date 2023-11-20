const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Healthy"));

app.get("/api/message", async (req, res) => {
  const pathBackend2 =
    process.env.SERVICE_BACKEND2 || "http://localhost:19030/api/message";

  const response = await axios.get(pathBackend2);

  const messageBackend1 = "Message from Backend1";
  const messageBackend2 = response.data.message;

  res.json({ messageBackend1, messageBackend2 });
});

app.use("**", (req, res) => res.send("Path not found"));

module.exports = app;
