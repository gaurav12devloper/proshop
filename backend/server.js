
import express from 'express';
import dotenv from 'dotenv'; // to use .env file for that 
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
//import products from './data/products.js';
import uploadRoutes from './routes/uploadRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
const port = process.env.PORT || 5000;
const app = express();
import path from 'path';

connectDB();

// Body parser midlleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); // cookie parser middleware

app.use('/api/products', productRoutes); //send it to productRoutes.js when /api/products is called
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => 
    res.send({clientId: process.env.PAYPAL_CLIENT_ID}) // send the paypal client id to the frontend
);

const __dirname = path.resolve(); // to use __dirname in ES6
console.log(__dirname); 
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // to make the uploads folder static


if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend/build/index.html')); 
    })

}
app.use(notFound);  // if we reach this point, it means that the request is not found
app.use(errorHandler); // if we reach this point, it means that there is an error



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});