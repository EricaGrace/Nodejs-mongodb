import {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "./../controllers/user.js";

import express from "express";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
