import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder } from '../controllers/orderController.js';
import {adminAuth} from '../middleware/adminAUTH.js';
import {authUser} from '../middleware/auth.js';

const orderRoutes = express.Router();
 
// Admin features
orderRoutes.post('/list',adminAuth , allOrders)
orderRoutes.post('/status',adminAuth , updateStatus);

// payment features
orderRoutes.post('/place', authUser, placeOrder);
orderRoutes.post('/stripe', authUser, placeOrderStripe);
orderRoutes.post('/razorpay', authUser, placeOrderRazorpay);

// user features
orderRoutes.post('/userorder', authUser, userOrder);

export default orderRoutes;


