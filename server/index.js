require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

app.use(express.json());
app.use(cors());
//routes here
app.use("/auth", authRouter);
app.use("/users", productRouter);

//after using those routes, if any error got, invokes here
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
