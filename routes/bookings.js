import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./../controllers/bookings.js";

import express from "express";

const router = express.Router();

router.post("/new-booking", createBooking);
router.get("/", getBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
