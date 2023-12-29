import express from "express";
import {
  createUser,
  deleteUser,
  depositCash,
  getBankData,
  getUserById,
  updateUser,
} from "../controllers/bankController.js";

const router = express();

router.get("/", getBankData);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/deposit/:id", depositCash);
router.delete("/:id", deleteUser);

export default router;
