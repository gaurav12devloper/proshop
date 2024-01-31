import express from "express";
const router=express.Router();
import Product from "../models/productModel.js";
import products from "../data/products.js";
import { getProducts, getProductById } from "../controllers/productController.js"

router.get('/api/products', getProducts);

router.get('/api/products/:id',getProductById); 


export default router;