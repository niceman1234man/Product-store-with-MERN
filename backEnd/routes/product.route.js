import express from 'express'
import { getProduct, getProductById,updateproduct,createProduct,deleteProduct} from '../controlers/product.control.js';
import { Signup,Login } from '../controlers/userController.js';
import { userVerify } from '../Authmiddleware/authmidlewar.js';
import auth from '../Auth/auth.js';

const router=express.Router();
router.get("/user/",userVerify,getProduct);
router.get("/:id",getProductById)
 router.put("/:id",updateproduct );
 router.post("/",userVerify,createProduct);
 router.delete("/:id",deleteProduct);
 router.post('/signup',Signup);
 router.post('/login',Login);
//  router.post('/v',userVerify);




export default router