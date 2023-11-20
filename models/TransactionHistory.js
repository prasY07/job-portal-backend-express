import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const transactionHistory = new Schema({
    payment_id: {
        type:String,
        required:true,
        unique:true
    },
    paymentDate:{
        type:Date,
        required:true,
    },
    success:{
        type:Boolean,
    },

    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
    },
    
    
});
export default mongoose.model("TranscationHistory", transactionHistory);

 