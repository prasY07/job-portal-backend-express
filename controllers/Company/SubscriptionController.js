import { errorResponse, successResponse } from "../../helpers/ResponseBuilder.js";
import Plan from "../../models/Plan.js"
import { config as configDotenv } from 'dotenv';
import Razorpay from "razorpay";
import TransactionHistory from "../../models/TransactionHistory.js";
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
        const user = req.user;
        const paymentLinkOptions = {
            amount: getPlan.price * 100,
            currency: "INR",
            customer: {
                name: user.name,
                email: user.email,
            },
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkOptions);
        const payment_history = new TransactionHistory({
            payment_link_id: paymentLink.id,
            paymentDate: new Date(),
            plan_id: getPlan.id,
            company_id: user.id

        });
        await payment_history.save();
        res.status(200).json(successResponse(paymentLink.short_url));
    } catch (err) {
        console.error(err);
        return res.status(500).json(errorResponse("Oops! Something went wrong"));
    }
};


export const webHook = async (req, res, next) => {
    try {
        const event =  req.body.event;
        const paymentLinkId = req.body.payload.payment_link.entity.id;
        const existingTransaction = await TransactionHistory.findOne({ payment_link_id: paymentLinkId });
        if (!existingTransaction) {
            return res.status(500).json(errorResponse("Paymwnt Id not exists"));
        }
        if(event == 'payment_link.cancelled'){
            existingTransaction.status = 'cancelled';
            existingTransaction.save();
            return res.status(500).json(successResponse(null,"Payment cancelled"));
            
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(errorResponse("Oops! Something went wrong"));
    }
}

export const onPaymentSuccess = async (transaction,status) => {
    try {
       
    } catch (err) {
        console.error(err);
        return res.status(500).json(errorResponse("Oops! Something went wrong"));
    }
}
