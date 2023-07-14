import landing from "./user.js";

const constructorMethod = (app) => {
  app.use("/", landing);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
