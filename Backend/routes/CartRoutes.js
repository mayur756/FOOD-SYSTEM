import express from 'express'
import { addToCart, clearCart, getUserCart, updateToCart } from '../controller/CartController.js';
import authUser from '../middleware/auth.js';

const cartRouter=express.Router();

cartRouter.post('/add',authUser,addToCart);
cartRouter.post('/update',authUser,updateToCart)
cartRouter.post('/get',authUser,getUserCart)
cartRouter.post("/clear", authUser, clearCart);


export default cartRouter