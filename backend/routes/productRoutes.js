import express from "express";
const router=express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import products from "../data/products.js";


router.get('/api/products', asyncHandler(async(req, res) => {
    const products=await Product.find({}); // empty object means all products
    res.json(products);
}));

router.get('/api/products/:id', asyncHandler(async(req, res) => {
    const product=await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    }
    res.status(404).json({message: 'Product not found'});
}));

export default router;