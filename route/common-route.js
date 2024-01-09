import express from "express";
import { login, logout, signup } from "../controllers/Common/AuthController.js";
import {validateSignup} from "../request/RegisterValidation.js";
import { validateLogin } from "../request/LoginValidation.js";
import { verifyUserByToken } from "../middleware/AuthMiddleware.js";

const authRouter = express.Router();

authRouter.post('/auth/register',validateSignup,signup);
authRouter.post('/auth/login',validateLogin,login);
authRouter.get('/auth/logout',verifyUserByToken,logout);



export default authRouter;