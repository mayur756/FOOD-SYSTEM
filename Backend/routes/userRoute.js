import express from 'express'
import { adminlogin, loginuser, registerUser } from '../controller/userController.js'


const userRouter = express.Router()


userRouter.post('/register',registerUser);
userRouter.post('/login',loginuser);
userRouter.post('/admin',adminlogin);


export default userRouter;