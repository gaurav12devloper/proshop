import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @des     Fetch all product
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async(req, res) => {
    const pageSize=5;
    const page = Number(req.query.pageNumber) || 1;
    const count=await Product.countDocuments(); // count the number of products
    const products=await Product.find({}).limit(pageSize).skip(pageSize*(page-1)); // empty object means all products
    res.json({products,page, pages: Math.ceil(count/pageSize)});
});

// @des     Fetch a product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
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

  // @des     Create a product
// @route POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id, // the user who created the product
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// @des     Update the product
// @route PUT /api/product/:id
// @access Private/admin
const updateProduct = asyncHandler(async(req, res) => {
    const { name,price,description,image,brand,category,countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment }= req.body;

  const product = await Product.findById(req.params.id);
  if(product){
    const alreadyReviewed = product.reviews.find(
      (review)=>review.user.toString()===req.user._id.toString()
    );
    if(alreadyReviewed){
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review={
      name: req.user.name,
      rating: Number(rating),
      comment,
      user:req.user._id,
    };
    product.reviews.push(review);
    product.numReviews=product.reviews.length;
    product.rating =product.reviews.reduce((acc, item) => item.rating + acc, 0) /product.reviews.length;
    
    await product.save();
    res.status(201).json({ message: 'Review added' });
    } else {
    res.status(404);
    throw new Error('Product not found');
}
});


export {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview};