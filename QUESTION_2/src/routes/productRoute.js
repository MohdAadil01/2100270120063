import express from "express";
const router = express.Router();
import { getProducts } from "../controllers/productController.js";

router.get("/:companyname/category/:categoryname/products", getProducts);

export default router;

// http://localhost:/300/test/companies/:companyname/category/:categoryname/products?top=n&minPrice=p&maxPrice=
