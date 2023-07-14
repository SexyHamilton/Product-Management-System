import express from "express";
import configRoutes from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// routes
configRoutes(app);
const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
