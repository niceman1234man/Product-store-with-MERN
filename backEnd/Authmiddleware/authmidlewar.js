import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const userVerify=(req,res,next)=>{
const authHeader=req.headers['authorization'];

const token=authHeader&&authHeader.split(" ")[1];
if(!token){
  return  res.status(401).json({
        succuss:false,message:"access denied. No token provided"
    })



}
try {
    const decodedTokenInfo=jwt.verify(token,process.env.TOKEN_KEY);
    console.log(decodedTokenInfo);
    req.userInfo=decodedTokenInfo;
    next();
 } catch (error) {
     console.log(error);
 }
 
   
}