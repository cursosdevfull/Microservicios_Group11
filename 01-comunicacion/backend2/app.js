const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Healthy"));

app.get("/api/message", (req, res) => {
  res.json({ message: "Message from Backend2" });
});

app.use("**", (req, res) => res.send("Path not found"));

module.exports = app;
