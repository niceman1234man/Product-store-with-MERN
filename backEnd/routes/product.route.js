import express from 'express'
import { getProduct, getProductById,updateproduct,createProduct,deleteProduct} from '../controlers/product.control.js';
import { Signup,Login, ForgotPassword, ResetPassword } from '../controlers/userController.js';
import { userVerify } from '../Authmiddleware/authmidlewar.js';
import { upload } from '../fileMiddleware.js';


const router=express.Router();
router.get("/user",userVerify,getProduct);
router.get("/:id",userVerify,getProductById)
 router.put("/:id",upload.single("image"),userVerify,updateproduct );
 router.post("/create",upload.single("image"),userVerify,createProduct);
 router.delete("/:id",userVerify,deleteProduct);
 router.post('/signup',Signup);
 router.post('/login',Login);
router.post('/forget',ForgotPassword);
router.post('/reset/:id/:token', ResetPassword);





export default router