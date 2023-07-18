import express from "express";
import configRoutes from "./routes/index.js";
import cors from "cors";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    name: "AuthCookie",
    secret: "ProductManagement",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
    },
  })
);
// routes
configRoutes(app);
const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
