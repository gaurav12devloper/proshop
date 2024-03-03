import express from "express";
const router=express.Router();
import { getProducts, getProductById } from "../controllers/productController.js"

import checkObjectId from '../middleware/checkObjectId.js'; 


//router.get('/', getProducts);
router.route('/').get(getProducts)
router.route('/:id').get(checkObjectId, getProductById);  // checkObjectId is a middleware to check for valid ObjectId

export default router;