import mongoose, { Types } from "mongoose";
const productSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
image:{
    type:String,
    required:true
},

},{
    timestamps:true
})
const Product=mongoose.model('Product',productSchema);
export default Product