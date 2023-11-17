import { errorResponse } from "../helpers/ResponseBuilder.js";

export const checkCompanyRole = async(req,res,next) => {
    if(req.user.role != 'company' ){
        return res.status(500).json(errorResponse("Access denied"));
    }
    next();
} 

export const checkUserRole = async(req,res,next) => {
    if(req.user.role != 'user' ){
        return res.status(500).json(errorResponse("Access denied"));
    }
    next();
} 
