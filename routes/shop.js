const express = require("express");

const router = express.Router();

const shopController = require("./../controller/shop");

// GET /shops/list
router.get("/list", (req, res) => {
  res.send(shopController.getShop);
});

//POST /shops/
router.post("/", (req, res) => {
  res.send(shopController.createShop);
});
module.exports = router;
