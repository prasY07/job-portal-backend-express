import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;
const userInformationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    resume: String,
    skills: [String],
});

export default mongoose.model("UserInformation", userInformationSchema);