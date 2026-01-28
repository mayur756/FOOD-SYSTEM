import express from "express"
import { allOrders,  placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controller/OrderController.js";
import adminauth from "../middleware/adminauth.js";
import authUser from "../middleware/auth.js"
const orderRouter = express.Router();

// for admin panel 

orderRouter.get('/list',adminauth,allOrders)
orderRouter.post('/status',adminauth,updateStatus);
//for payment
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/verfiyStripe',authUser,verifyStripe);

// for frontend
orderRouter.post('/userorders',authUser,userOrders);



export default orderRouter