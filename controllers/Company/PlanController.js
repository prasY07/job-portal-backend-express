import { errorResponse, successResponse } from "../../helpers/ResponseBuilder";
import Plan from "../../models/Plan";
import { allPlansInfo } from "../../resource/PlanResource";


export const getAllPlan = async() => {

    try{
        const allPlans = await Plan.find();
        const allData = await allPlansInfo(allPlans);
        return res.status(200).json(successResponse(allData));
    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}