import express from 'express'
import { addCart, getUserCart, updateCart } from '../controllers/cartController.js';
import { authUser } from '../middleware/auth.js';

let cartRouter = express.Router();


cartRouter.post('/get',  authUser , getUserCart )
cartRouter.post('/add', authUser , addCart )
cartRouter.post('/update', authUser , updateCart )

export default cartRouter;  