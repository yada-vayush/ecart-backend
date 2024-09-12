const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const testRouter = require("./routes/api/index.js");

const connect = require("./config/database.js");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", testRouter);
const PORT = 3001;
app.listen(PORT, async () => {
  console.log("Server running on port ", PORT);
  await connect();
});
