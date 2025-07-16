import express from 'express'
import { adminLogin, loginUser, signInUser } from '../controllers/userController.js'


let userRouter = express.Router()

userRouter.post('/sign', signInUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)


export default userRouter