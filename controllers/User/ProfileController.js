import { errorResponse, successResponse } from "../../helpers/ResponseBuilder.js";
import Technology from "../../models/Technology.js";
import User from "../../models/User.js";
import UserInformation from "../../models/UserInformation.js";
import { userCompleteInfoResource } from "../../resource/UserResource.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const userData = await userCompleteInfoResource(user);
    return res.status(200).json(successResponse(userData));
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponse("OOPS! Something went wrong"));
  }
}


export const updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, email,skills } = req.body;
    await Technology.find({ _id: { $in: skills } })
    .exec().catch((err) => {
        return res.status(500).json(errorResponse("Invalid Skills"));
    });
    const userWithSameEmail = await User.findOne({ email, _id: { $ne: user._id } });
    if (userWithSameEmail) {
      return res.status(401).json(errorResponse("Email already exists"));
    }
    user.name  = name;
    user.email = email;
    await user.save();
    await UserInformation.updateOne({user_id:user._id},{$set:{
      skills:skills,
    }},{
      upsert: true
    })
    const userData = await userCompleteInfoResource(user);


    return res.status(200).json(successResponse(userData));
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponse("OOPS! Something went wrong"));
  }
}