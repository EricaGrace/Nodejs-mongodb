import {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  getHighestAmount,
  getTotalAmountOfSales,
} from "./../controllers/sale.js";

import express from "express";

const router = express.Router();

router.get("/best-sale", getHighestAmount);
router.get("/total-amount", getTotalAmountOfSales);
router.get("/", getSales);
router.get("/:id", getSale);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;
