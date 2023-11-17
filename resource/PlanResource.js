import CompanyInformation from "../models/CompanyInformation.js";


export const allPlansInfo = async (plans) => {
    const allPlans = await Promise.all(plans.map(async (plan) => {
        return {
            id: plan._id,
            name: plan.name,
            price: plan.price,
        };
    }));

    return allPlans;
};

