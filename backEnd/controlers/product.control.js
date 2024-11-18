import Product from '../models/product.model.js';
import mongoose from 'mongoose';


export const getProduct = async (req, res) => {
    const { userId } = req.userInfo;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }

    console.log("User ID:", userId); // Debugging log

    try {
        // Use mongoose.Types.ObjectId to convert userId to ObjectId
        const products = await Product.find({ user: new mongoose.Types.ObjectId(userId) });

        console.log("Fetched Products:", products); // Log fetched products

        if (!products.length) {
            return res.status(404).json({
                success: false,
                message: "No products found for this user."
            });
        }

        res.status(200).json({ success: true, data: products });

    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server failed to fetch products." });
    }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log('Error fetching product:', error.message); // More detailed error logging
    res.status(500).json({ success: false, message: 'Server failed', error: error.message });
  }
};


 export const updateproduct = async (req, res) => {
   const { id } = req.params;
   const { name, price } = req.body;
 
   if (!name || !price || !req.file) {
     return res.status(400).json({ success: false, message: "Please provide all fields (name, price, image)" });
   }
 
   const image = req.file.filename;
 
   // Check if the provided ID is valid
   if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(404).json({ success: false, message: "Invalid product ID" });
   }
 
   try {
 
     const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, image }, { new: true });

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
  const {userId}=req.userInfo;


    try {
      // Validate that all required fields are provided
      const { name, price} = req.body;
     
      if (!name || !price || !req.file) {
        return res.status(400).json({ success: false, message: "Please provide all fields (name, price, image)" });
      }
  const image=req.file.filename;
      // Create a new product with the provided data and associate it with the user
      const newProduct = new Product({
        name,
        price,
        image,
        user:userId, // `user` is added to req by the auth middleware
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