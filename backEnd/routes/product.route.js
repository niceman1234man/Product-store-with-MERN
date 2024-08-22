import express from 'express'
import { getProduct, getProductById,updateproduct,createProduct,deleteProduct} from '../controlers/product.control.js';

const router=express.Router();

router.get("/",getProduct);
router.get("/:id",getProductById)
 router.put("/:id",updateproduct );
 router.post("/",createProduct);
 router.delete("/:id",deleteProduct);




export default router