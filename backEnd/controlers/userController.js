import mongoose from "mongoose";
import User from "../models/userModel.js";
import { CreateSecreteToken } from "../util/SecreteToken.js";
import bcrypt from 'bcrypt';

export const Signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existedUser = await User.findOne({ email }); // Await the result of findOne
        if (existedUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12); // Await the hash operation

        // Create a new user
        const user = await User.create({ username, email, password: hashedPassword });

        // Create a token
        const token = CreateSecreteToken(user._id);

        // Set the cookie
        res.cookie("token", token, {
            httpOnly: true, // Set to true for security
            secure: false, // Change to true in production with HTTPS
            sameSite: "Strict" // Optional: improve security
        });

        // Send response
        res.status(201).json({ success: true, message: "User signed up successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email }); // Await the result of findOne
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password); // Await the comparison
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Create a token
        const token = CreateSecreteToken(user._id);

        // Set the cookie
        res.cookie("token", token, {
            httpOnly: true, // Set to true for security
            secure: false, // Change to true in production with HTTPS
            sameSite: "Strict" // Optional: improve security
        });

        // Send response
        res.status(200).json({ success: true, message: "User logged in successfully" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};