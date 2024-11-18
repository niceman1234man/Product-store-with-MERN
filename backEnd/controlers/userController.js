import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
dotenv.config();

export const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: "3d" } // expires in 3 days
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        res.status(201).json({ success: true, message: "User signed up successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: "3d" }
        );

        res.cookie("token", accessToken, {
            httpOnly: false,
            withCredentials: true,
           
        });

        
        res.status(200).json({ success: true, message: "User logged in successfully", accessToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const ForgotPassword=async(req,res)=>{
const {email}=req.body;
try {
   const user=await User.findOne(email) ;
   if(!user){
    return res.status(401).json({sucess:true,message:"user not exist try again"})
   }
   const accessToken = jwt.sign(
    { userId: user._id, },
    process.env.TOKEN_KEY,
    { expiresIn: "3d" }
);



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: process.env.USER_EMAIL,
  to: `${user.email}`,
  subject: 'Reset Your Password',
  text:`http://localhost:5173//reset/${user._id}/${accessToken}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    res.json({sucess:true})
  }
});
} catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
}

}

export const ResetPassword=(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;
    jwt.verify(token, process.env.TOKEN_KEY,(err,decoded)=>{
        if(err){
            return res.json({sucess:false,message:"Error token"});
        }else{
            try {
    
                const hashedPassword=bcrypt.hash(password,12);
                User.findByIdAndUpdate({_id:userId,password:hashedPassword}).then(()=>{
                    res.status(200).json({sucess:true,message:"Password reseted sucessfully"})
                }).catch((err)=>{
            console.log(err);
                })
            } catch (error) {
                console.log(error)
                res.status(500).json({ message: "Internal server error" });   
            }
              
        }
    });

}