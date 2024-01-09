import { errorResponse, successResponse } from "../../helpers/ResponseBuilder.js";
import Plan from "../../models/Plan.js";
import { allPlansInfo } from "../../resource/PlanResource.js";


export const getAllPlan = async(req,res,next) => {
    try{
        const allPlans = await Plan.find();
        const allData  = await allPlansInfo(allPlans);
        return res.status(200).json(successResponse(allData));
    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}