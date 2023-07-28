require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const { loginRequired } = require("./middleware/auth");
const db = require("./models");

app.use(express.json());
app.use(cors());
//routes here
app.use("/auth", authRouter);
app.use("/users", productRouter);

//after using those routes, if any error got, invokes here
app.get("/products", loginRequired, async function (req, res, next) {
  try {
    const products = await db.Product.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        name: true,
        link: true,
        price: true,
      });
    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
});

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
