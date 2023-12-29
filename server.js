import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/api/v1/bank" , bankRoutes)

// app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
