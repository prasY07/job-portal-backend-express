import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;
const companyInformationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    company_name: String,
    company_address: String,
    wallet_amount: {
        type: Number, 
        default: 0, 
    },
});

export default mongoose.model("CompanyInformation", companyInformationSchema);