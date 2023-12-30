import express from "express";
import {
  createUser,
  deleteUser,
  depositCash,
  getBankData,
  getUserById,
  transferMoney,
  updateUserCredit,
  withdrawMoney,
} from "../controllers/bankController.js";

const router = express();

router.get("/", getBankData);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserCredit);
router.put("/deposit/:id", depositCash);
router.put("/withdraw/:id", withdrawMoney);
router.put("/transfer/from/:senderId/to/:recipientId", transferMoney);
router.delete("/:id", deleteUser);

export default router;
