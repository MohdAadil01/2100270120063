import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

const getProducts = asyncHandler(async (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  let query = {};
  if (companyname) query.companyName = companyname;
  if (categoryname) query.category = categoryname;
  if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

  let products = await Product.find(query);

  if (top) {
    const topLimit = parseInt(top, 10);
    products = products.sort((a, b) => b.price - a.price).slice(0, topLimit);
  }

  res.json(products);
});

export { getProducts };
