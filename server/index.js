const express = require("express");
const { userRouter } = require("./routes/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

