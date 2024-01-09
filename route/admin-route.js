import express from "express";
import { login, logout } from "../controllers/Admin/AuthController.js";
import { validateLogin } from "../request/LoginValidation.js";
import { verifyAdminByToken } from "../middleware/AdminAuthMiddleware.js";
import { addTechnology, list, updateTechnology } from "../controllers/Admin/TechnologyController.js";
import { updateTechnologyRequest } from "../request/Admin/UpdateTechnologyRequest.js";
import { webHook } from "../controllers/Company/SubscriptionController.js";

const adminRouter = express.Router();

adminRouter.post('/auth/login', validateLogin, login);

adminRouter.use(verifyAdminByToken);
adminRouter.get('/auth/logout', logout);
adminRouter.get('/technology/all-list', list);
adminRouter.post('/technology/add', addTechnology);
adminRouter.put('/technology/:id/update',updateTechnologyRequest, updateTechnology);

export default adminRouter;