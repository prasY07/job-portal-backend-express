import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const buySubscription = new Schema({
    transactionId: {
        type:String,
        required:true,
        unique:true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    payment_history_id: {
        type: Schema.Types.ObjectId,
        ref: 'TranscationHistory',
    },

    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
    },
    
    startDate: Date,
    endDate: Date,
});
export default mongoose.model("TranscationHistory", buySubscription);

 