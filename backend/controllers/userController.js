import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generatesToken.js";
// @des     Auth user & token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email}); //fetch user detail from database
    
    if(user && (await user.matchPassword(password))){
        const token = generateToken(res, user._id); //generate token

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

// @des     Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password} = req.body;
    const userExist = await User.findOne({email}); //fetch user detail from database
    if(userExist){
        res.status(400);
        throw new Error('User already exist');
    }
    const user = await User.create({ // create new user
        name,
        email,
        password
    });
    if(user){ //if user is created successfully
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            isAdmin: user.isAdmin, //default value is false
        });
    }

});

// @des     Logout User / clear cookies
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '',{
        httpOnly: true,
        expires : new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'});
});

// @des     GET user profile
// @route   GET /api/users/profile
// @access  Private
const getuserProfle = asyncHandler(async(req, res) => {
    const user= await User.findById(req.user._id); //in protection middlewire we have set user in req.user
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else{
        res.status(404);
        throw new Error('User not found');
    
    }

});


// @des     Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateuserProfle = asyncHandler(async(req, res) => {
    const user= await User.findById(req.user._id); //in protection middlewire we have set user in req.user
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        const updatedUser= await user.save();
        res.status(200).json({  //json:  It serializes the provided JavaScript object into JSON format and sends it as the response body.
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});


// @des     Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    const users=await User.find({});
    res.status(200).json(users);

});

// @des     Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async(req, res) => {
    const user=await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){ // if user is not admin
            res.status(400);
            throw new Error('You cannot delete admin user');
        }
        await user.deleteOne({_id: user._id});
        res.status(200).json({message: 'User deleted successfully'});
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @des     get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async(req, res) => {
   const user= await User.findById(req.params.id).select('-password');
   if(user){
         res.status(200).json(user);
   }
    else{
          res.status(404);
          throw new Error('User not found');
    }
});

// @des     Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async(req, res) => {
   const user=await User.findById(req.params.id);
    if(user){
         user.name=req.body.name || user.name;
         console.log(user.name);
         user.email=req.body.email || user.email;
         user.isAdmin=Boolean(req.body.isAdmin);
         const updatedUser= await user.save();
         res.status(200).json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin
         });
    }
    else{
         res.status(404);
         throw new Error('User not found');
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getuserProfle,
    updateuserProfle,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}






