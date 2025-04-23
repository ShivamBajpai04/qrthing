import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import generateRouter from "./routes/generate.routes.js";
import scanRouter from "./routes/scan.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/output", express.static("output"));

app.use("/generate", generateRouter);
app.use("/scan", scanRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
