import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @des     Fetch all product
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async(req, res) => {
    const products=await Product.find({}); // empty object means all products
    res.json(products);
});


// @des     Fetch a product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async(req, res) => {
    const product=await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    }else {
        res.status(404);
        throw new Error('Product not found'); // this will be caught by the error handler
    }
});

export {getProducts, getProductById};