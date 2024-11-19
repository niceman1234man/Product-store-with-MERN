import express from 'express'
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.route.js'
import cors from 'cors'
import path from 'path';
import dotenv from'dotenv';

import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
dotenv.config();
const app=express();
app.use(cookieParser());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin:"https://yihunie-product-store.netlify.app",
    methods:["GET","PUT","DELETE","POST"],
    credentials:true,
}));
app.use(express.json());
app.use("/products",productRoutes)
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port,()=>{
    connectDb();
    console.log("server running on servrr 3000");
})
