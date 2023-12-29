import express from "express";
import {
  createUser,
  deleteUser,
  depositCash,
  depositCredit,
  getBankData,
  getUserById,
  updateUser,
} from "../controllers/bankController.js";

const router = express();

router.get("/", getBankData);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/deposit-cash/:id", depositCash);
router.put("/deposit-credit/:id", depositCredit);
router.delete("/:id", deleteUser);

export default router;
