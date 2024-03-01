import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import Concol from 'vconcol';
const cc=new Concol();
//protect routes 
const protect=asyncHandler(async (req,res,next) => {
    let token;
    // Read the JWT from the cookies
    token=req.cookies.jwt; //  during setting token we have use name jwt that why we accesing here using jwt
    //console.log("tokrn req",token); 
    cc.success("token req : "+token);
    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            /*`req.user` will contain the user object retrieved from the database, excluding the `password` field. This user object can then be used by subsequent middleware or route handlers to perform further operations or to provide user-specific functionality. */
            req.user = await User.findById(decoded.userId).select('-password'); // decoded.userId is the payload we have passed during setting token, we select all the field except password
            //console.log('\x1b[42m%s\x1b[0m','user authenticated');
            next(); // if token is valid then move to next middleware
        }
        catch(error){
            res.status(401);
            console.log(error);
            throw new Error("not authorize, token failed");
        }
    }else{
        res.status(401);
        throw new Error('Not authorize,no token');
    }
});


// Admin middleware
const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401);
        throw new Error('Not authorize as admin');
    }
}

export { protect, admin };