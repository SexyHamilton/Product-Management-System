const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://training:shangan@fullstack-training.gw3nkbl.mongodb.net/<database>"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
