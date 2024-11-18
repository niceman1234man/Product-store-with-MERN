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
            { expiresIn: "3d" } 
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

export const ForgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({ success: true, message: "If the email exists, a reset link will be sent." });
      }
  
      console.log(`Password reset requested for: ${email}`);
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.TOKEN_KEY,
        { expiresIn: "3d" }
      );
 
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      
      const resetUrl = `http://localhost:5173/reset/${user._id}/${accessToken}`;
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: 'Reset Your Password',
        text: `Click the link below to reset your password:${resetUrl}`,
      };
  
   
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ success: false, message: "Error sending email. Please try again later." });
        }
        console.log(`Password reset email sent: ${info.response}`);
        res.status(200).json({ success: true, message: "Password reset link sent to your email." });
      });
  
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
    }
  };
  

  export const ResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
     console.log("id of :",id);
     console.log("token :",token);
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      if (decoded.userId !== id) {
        return res.status(400).json({ success: false, message: "Invalid token or user ID mismatch." });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(400).json({ success: false, message: "Invalid token." });
      }
  
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
  