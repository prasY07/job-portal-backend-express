import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const transactionHistory = new Schema({
    payment_link_id: {
        type:String,
        required:true,
        unique:true
    },
    paymentDate:{
        type:Date,
        required:true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed','cancelled'],
        default: 'pending'
    },
    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
    },
    
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

});
export default mongoose.model("TranscationHistory", transactionHistory);

 