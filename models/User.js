import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role: {
        type: String,
        enum: ["user", "company"],
        required: true
    },
    tokens: [
        {
            type: String
        }
    ]
});
export default mongoose.model("User", userSchema);

 