import express from "express";
import {
  createUser,
  deleteUser,
  depositCash,
  filterUsersByHigherCash,
  filterUsersByLetter,
  filterUsersByLowerCash,
  getBankData,
  getUserById,
  transferMoney,
  updateUserCredit,
  withdrawMoney,
} from "../controllers/bankController.js";

const router = express();

router.get("/", getBankData);
router.get("/:id", getUserById);
router.get("/users/name", filterUsersByLetter);
router.get("/users/higher-than", filterUsersByHigherCash);
router.get("/users/lower-than", filterUsersByLowerCash);
router.put("/:id", updateUserCredit);
router.put("/deposit/:id", depositCash);
router.put("/withdraw/:id", withdrawMoney);
router.put("/transfer/from/:senderId/to/:recipientId", transferMoney);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
