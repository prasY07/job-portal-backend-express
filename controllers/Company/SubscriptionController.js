import { errorResponse, successResponse } from "../../helpers/ResponseBuilder.js";
import Plan from "../../models/Plan.js"
import { config as configDotenv } from 'dotenv';
import Razorpay from "razorpay";
configDotenv();
export const buySubscription = async (req, res, next) => {
    try {
        const { plan_id } = req.body;
        const getPlan = await Plan.findById(plan_id);

        if (!getPlan) {
            return res.status(404).json(errorResponse("Plan not found"));
        }

        const razorpay = new Razorpay({
            key_id: process.env.razorpay_key_id,
            key_secret: process.env.razorpay_key_secret
        });

        const paymentLinkOptions = {
            amount: 500,
            currency: "INR",
            customer: {
                email: "johndoe@example.com",
                contact: "+911234567890"
                // Add more customer details if required
            },
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkOptions);
        console.log(paymentLink);

        res.status(200).json(successResponse(paymentLink));
    } catch (err) {
        console.error(err);
        return res.status(500).json(errorResponse("Oops! Something went wrong"));
    }
};
