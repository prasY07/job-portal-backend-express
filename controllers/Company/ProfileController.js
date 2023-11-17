import { errorResponse, successResponse } from "../../helpers/ResponseBuilder.js";
import CompanyInformation from "../../models/CompanyInformation.js";
import User from "../../models/User.js";
import { companyFullInfo } from "../../resource/CompanyResource.js";

export const getProfile = async(req,res,next) => {
    try {
        const user     = req.user;
        const userData = await companyFullInfo(user);
        return res.status(200).json(successResponse(userData));
      } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! Something went wrong"));
      }
}

export const updateProfile = async(req,res,next) => {
    try {
        const user = req.user;
        const {name,email,company_name,company_address} = req.body
        const userWithSameEmail = await User.findOne({ email, _id: { $ne: user._id } });
        if(userWithSameEmail){
         return res.status(401).json(errorResponse("Email already exists"));
        }
        user.name  = name;
        user.email = email;
        await user.save();

        await CompanyInformation.updateOne({user_id:user._id},{$set:{
          company_name:company_name,
          company_address:company_address
        }},{
          upsert: true
        })
        const companyUpdateData = await companyFullInfo(user);
        return res.status(200).json(successResponse(companyUpdateData));
      } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! Something went wrong"));
      }
}