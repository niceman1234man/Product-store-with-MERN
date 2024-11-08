import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        typr:String,
        required:true,
    }
},{timestamps:true});
const User=mongoose.model("User",userSchema);
export default User;