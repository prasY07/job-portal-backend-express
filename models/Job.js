import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    exp_in_years: {
        type: Number,  // Corrected the data type to Number
        required: true
    },
    exp_in_month: {
        type: Number,  // Corrected the data type to Number
        required: true
    },

    technologies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Technology'
        }
    ],
    applied_users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    added_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async function (userId) {
                const user = await this.model('User').findById(userId);

                return user && user.role === 'company';
            },
            message: 'The added_by user must have the "company" role.'
        }
    }
    
 
});
export default mongoose.model("Job", JobSchema);

 