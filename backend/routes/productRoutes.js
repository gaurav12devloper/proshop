import express from "express";
const router=express.Router();
import {createProduct ,getProducts, getProductById, updateProduct,
     deleteProduct,
     createProductReview,
    getTopProducts,
    } from "../controllers/productController.js"

import checkObjectId from '../middleware/checkObjectId.js'; 
import { protect, admin } from '../middleware/authMiddleware.js';

//router.get('/', getProducts);
router.route('/').get(getProducts).post(protect, admin, createProduct); // protect is a middleware to protect routes
router.get('/top', getTopProducts); // get top rated products
router.route('/:id').get(checkObjectId, getProductById).put(protect,admin,updateProduct);  // checkObjectId is a middleware to check for valid ObjectId   
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);
export default router;