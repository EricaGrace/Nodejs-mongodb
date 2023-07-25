const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware parse les requêtes, évite de passer par buffer (voir demo.js)
app.use(express.json());

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/users");

// Pour accéder aux routes admin préfixer par admin
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/shop", shopRoutes);

mongoose
  .connect(
    "mongodb+srv://lfauvet1:" +
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
