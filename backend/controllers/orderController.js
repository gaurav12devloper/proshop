import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @des     Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req, res) => {
   const {
         orderItems,
         shippingAddress,
         paymentMethod,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }
    else{
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                    ...x, // spread all the properties of x
                    product: x._id,
                    _id: undefined // we don't want to save the id of the order item in the order collection
                })),
            user: req.user._id,  // get the logged in user id
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();  // save the order to the database
        res.status(201).json(createdOrder);
    }
});

// @des     get Logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async(req, res) => {
   const orders = await Order.find({user: req.user._id});
   res.status(200).json(orders);
});

// @des     get order by ID
// @route POST /api/orders
// @access Private
const getOrderById = asyncHandler(async(req, res) => {
    console.log(req.params.id);
    const order = await Order.findById(req.params.id).populate('user', 'name email'); // since order collection was not contain user name , email, we use populate to get user name and email
    console.log(order);
    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @des     update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save(); // save the updated order to the database
        res.status(200).json(updatedOrder);
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @des     Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    res.send('update order to delivered');
});

// @des     get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async(req, res) => {
    res.send('get all orders');
});

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders};
