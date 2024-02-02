import express from "express";
const router=express.Router();
import Product from "../models/productModel.js";
import products from "../data/products.js";
import { getProducts, getProductById } from "../controllers/productController.js"

import checkObjectId from '../middleware/checkObjectId.js'; 


router.get('/api/products', getProducts);

router.get('/api/products/:id',checkObjectId ,getProductById); // checkObjectId is a middleware to check for valid ObjectId




export default router;