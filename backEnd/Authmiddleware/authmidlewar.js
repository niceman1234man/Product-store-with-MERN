import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const userVerify=(req,res,next)=>{
const token=req.cookies.token;

if(!token){
  return  res.status(401).json({
        succuss:false,message:"access denied. No token provided"
    })

}
try {
    const decodedTokenInfo=jwt.verify(token,process.env.TOKEN_KEY);
  
    req.userInfo=decodedTokenInfo;
    next();
 } catch (error) {
    console.log(error);
    return  res.status(401).json({
        succuss:false,message:"access denied. No token provided"
    })
     
 }
 
   
}