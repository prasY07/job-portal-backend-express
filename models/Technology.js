import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const technologySchema = new Schema({
    name: {
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
 
});
export default mongoose.model("Technology", technologySchema);

 