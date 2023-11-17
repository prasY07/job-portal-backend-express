import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const planSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:String,
        required:true,
    },
 
});
export default mongoose.model("Plan", planSchema);

 