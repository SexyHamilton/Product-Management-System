import express from "express";
import configRoutes from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
configRoutes(app);
const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

