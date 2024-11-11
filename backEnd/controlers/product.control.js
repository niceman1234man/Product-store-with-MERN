import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProduct=async(req,res)=>{


   
        
    try {
        const userId = req.params.userId;
     const products=await Product.find({userId});
     res.status(200).json({success:true,data:products});
 
    } catch (error) {
     console.log("error",error.message);
     res.status(500).json({success:false,message:"server failed"})
    }
 };


 export const getProductById=async(req,res)=>{
    try {
        const {id}=req.params;
     const products=await Product.findById(id);
     res.status(200).json({success:true,data:products});
 
    } catch (error) {
     console.log("error",error.message);
     res.status(500).json({success:false,message:"server failed"})
    }
 };

 export const updateproduct =async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
        // Attempt to update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error", error.message);
        res.status(500).json({ success: false, message: "Product not updated" });
    }
};

export const createProduct= async(req,res)=>{
    const product=req.body;
    if(!product.name||!product.price||!product.image){
        return res.status(400).json({success:false,message:"please provide all fields"});
        
    }
    const newProduct= new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct})
    } catch (error) {
        console.error("error in create product",error.message);
        res.status(500).json({success:false,message:"sever error"});
    }
   
};


export const deleteProduct= async(req,res)=>{
    const {id}=req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"product deleted"})
    } catch (error) {
        res.status(404).json({success:false,message:"product not found"})
    }
    console.log("id",id);
    
    }