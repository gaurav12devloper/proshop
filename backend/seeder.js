import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from './data/users.js';
import products from './data/products.js';
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB(); // await is so that database is get connected and then below part start executing

const importData= async ()=>{
    try{
        //clear all data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //insert new data
        const createUsers= await User.insertMany(users);
        const adminUser= createUsers[0]._id;

        const sampleProducts=products.map(product => {
            return { ...product, user:adminUser };
        });
        await Product.insertMany(sampleProducts);

        console.log('Data Imported'.green.inverse);
        process.exit();

    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit();
    }
}

const destroyData = async () => {
    try{
        //clear all data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!'.green.red);
        process.exit();
    }
    catch(error){
        console.log('Data Deleted'.green.red);
        process.exit(1);
    }
};

console.log(process.argv[2]); // it will give argument taken at command

if(process.argv[2]==='-d'){
    destroyData();
}
else{
    importData();
}
