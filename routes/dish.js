import {
  getDishes,
  createDish,
  updateDish,
  deleteDish,
} from "./../controllers/dish.js";

import express from "express";

const router = express.Router();

router.get("/", getDishes);
router.post("/", createDish);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

export default router;
