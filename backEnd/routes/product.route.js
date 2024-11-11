import express from 'express'
import { getProduct, getProductById,updateproduct,createProduct,deleteProduct} from '../controlers/product.control.js';
import { Signup,Login } from '../controlers/userController.js';
import { userVerify } from '../Authmiddleware/authmidlewar.js';

const router=express.Router();
router.get("/user/:userId",getProduct);
router.get("/:id",getProductById)
 router.put("/:id",updateproduct );
 router.post("/",createProduct);
 router.delete("/:id",deleteProduct);
 router.post('/signup',Signup);
 router.post('/login',Login);
 router.post('/v',userVerify);




export default router