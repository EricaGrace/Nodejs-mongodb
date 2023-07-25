import express, { json } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(json());

import dishRoutes from "./routes/dish.js";
import restaurantRoutes from "./routes/restaurant.js";

app.use("/dishes", dishRoutes);
app.use("/restaurants", restaurantRoutes);

connect(
  "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@cluster0.8bik77r.mongodb.net/?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("app is successfully connected");
    app.listen(process.env.DB_PORT, () => {
      console.log("server listening on port " + process.env.DB_PORT);
    });
  })
  .catch((err) => console.log(err));
