import landing from "./user.js";
import products from "./products.js";

const constructorMethod = (app) => {
  app.use("/", landing);
  app.use("/", products);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
