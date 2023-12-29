import express from "express";
import {
  createUser,
  deleteUser,
  getBankData,
  getUserById,
  updateUser,
} from "../controllers/bankController.js";

const router = express();

router.get("/", getBankData);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
