import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoute.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/test/companies", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
