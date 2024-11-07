import express from 'express'
import { connectDb } from './config/db.js';
import productRoutes from './routes/product.route.js'
import cors from 'cors'
const app=express();
app.use(cors());
app.use(express.json());
app.use("/products",productRoutes)
app.listen(3000,()=>{
    connectDb();
    console.log("server running on servrr 5000");
})
