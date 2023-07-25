import {
  getRestaurant,
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "./../controllers/restaurant.js";

import express from "express";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
