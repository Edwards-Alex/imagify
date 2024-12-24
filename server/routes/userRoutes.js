import express from 'express'
import { registerUser, loginUser, userCredits } from "../controllers/userController.js";
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
//millderware userAuth add userID to req.body from req.header.token use jwt.verify(token, process.env.SECRET_JWT)
userRouter.get('/credits', userAuth ,userCredits);


export default userRouter;

// http://localhost:4000/api/user/register 
// http://localhost:4000/api/user/login 