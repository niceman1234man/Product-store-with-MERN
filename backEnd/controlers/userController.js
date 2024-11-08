import mongoose from "mongoose";
import User from "../models/userModel.js";
import { CreateSecreteToken } from "../util/SecreteToken.js";
import bcrypt from 'bcrypt'
export const Signup=async(req,res,next)=>{

    try {
        const {  username,email, password, } = req.body;
        if(!username||!email||!password){
            return res.json({message:"all fields required"})
        }
        const existeduser=User.findOne({email});
        if(existeduser){
            return res.json({message:"user already existed"});

        }
        password=bcrypt.hash(password,12);
        const user=await User.create({username,email,password});
        const token=CreateSecreteToken(user._id);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false,
        })
       
  res.status(201).json({success:true,message:"user sign up successfully"})
  next();
    } catch (error) {
        console.log(error);
    }
}


export const Login=async(req,res,next)=>{

try {
    const {email,password}=req.body;
    password=bcrypt.hash(password,12);
    if(!email||!password){
        return res.json({message:"all fields required"});
    }
const user=User.findOne({email});
if(!user){
    return res.json({message:"user not exist"});
}
if(!bcrypt.compare(password,user.password)){
return res.json({message:"Incorrect Password"});
}

const token=CreateSecreteToken(user._id);
res.cookie("token",token,{
    withCredentials:true,
    httpOnly:false,
})
res.status(201).json({sucess:true,message:"user login successfully"});
next();
} catch (error) {
    console.log(error);
}

}