import express from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import bankRoutes from "./routes/bankRoutes.js";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  const indexHtml = fs.readFileSync("./constants/index.html", "utf-8");
  res.send(indexHtml);
});
app.use("/api/v1/bank", bankRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
