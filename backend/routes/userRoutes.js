import express from "express";
const router=express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getuserProfle,
    updateuserProfle,
    getUsers,
    deleteUser,
    getUserById,
    updateUser } from "../controllers/userController.js";

import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.route('/auth').post(authUser);
router.route('/profile').get(protect,getuserProfle).put(protect,updateuserProfle); // protect middleware is use for checking whether user is valid or not
router.route('/:id').delete(deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser); // admin middleware is use for checking whether user is admin or not
export default router;