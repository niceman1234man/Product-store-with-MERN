import User from "../models/userModel";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const userVerify=(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({status:false});
    }
    jwt.verify(token,process.env.TOKEN_KEY,(err,data)=>{
        if(err){
            return res.json({status:false});
        }else{
        const user=User.findById(data.id);
        if(user){
            return res.json({status:true,user:data.username});
        }else{
            return res.json({status:false});
        }
        }
    })
}