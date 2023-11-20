const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/", express.static("./public"));

app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Healthy"));

const pathBackend1 =
  process.env.SERVICE_BACKEND1 || "http://localhost:19020/api/message";

app.get("/api/config", (req, res) => {
  res.json({ pathBackend1 });
});

app.use("**", (req, res) => res.send("Error: Path not found"));

module.exports = app;
