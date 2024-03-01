import express from 'express';
import dotenv from 'dotenv'; // to use .env file for that 
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Body parser midlleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); // cookie parser middleware
app.get('/api/products', productRoutes); // send it to productRoutes.js when /api/products is called
app.use('/api/users', userRoutes); // send it to userRoutes.js when /api/users is called
app.get('/api/products/:id',productRoutes);

app.use(notFound);  // if we reach this point, it means that the request is not found
app.use(errorHandler); // if we reach this point, it means that there is an error

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});