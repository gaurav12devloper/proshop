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

const getProductById = asyncHandler(async (req, res) => {
    // NOTE: checking for valid ObjectId to prevent CastError moved to separate
    // middleware. See README for more info.
  

const product = await Product.findById(req.params.id);
if (product) {
    return res.json(product);
} else {
      // NOTE: this will run if a valid ObjectId but no product was found
      // i.e. product may be null
      // if id is not found in the database, then checkMiddleware.js will catch it we have called checkMiddleware.js during routing
      res.status(404);
      throw new Error('Product not found');
    }
  });

export {getProducts, getProductById};