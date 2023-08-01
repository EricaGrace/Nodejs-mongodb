import express, { json } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import auth from "./middlewares/auth.js";
import logger from "./logger.js";

dotenv.config();

const app = express();

app.use(json());

import dishRoutes from "./routes/dish.js";
import restaurantRoutes from "./routes/restaurant.js";
import saleRoutes from "./routes/sale.js";
import bookingsRoutes from "./routes/bookings.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

app.use("/api/dishes", dishRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/sales", auth, saleRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

connect(process.env.DB_URI)
  .then(() => {
    logger.log("app is successfully connected");
    app.listen(process.env.DB_PORT, () => {
      logger.log("server listening on port " + process.env.DB_PORT);
    });
  })
  .catch((err) => logger.log(err));
