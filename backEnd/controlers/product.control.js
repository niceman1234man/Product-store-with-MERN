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

export const createProduct = async (req, res) => {
    try {
      // Validate that all required fields are provided
      const { name, price, image } = req.body;
      if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields (name, price, image)" });
      }
  
      // Create a new product with the provided data and associate it with the user
      const newProduct = new Product({
        name,
        price,
        image,
        user: req.user._id, // `user` is added to req by the auth middleware
      });
  
      // Save the product to the database
      await newProduct.save();
  
      // Respond with success and the new product data
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error in createProduct:", error.message);
      res.status(500).json({ success: false, message: "Server error. Could not create product." });
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