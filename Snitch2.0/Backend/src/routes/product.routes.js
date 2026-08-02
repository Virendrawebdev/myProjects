import {Router} from 'express';
import { createProduct, getAllProducts, getMyProducts, getSingleProduct, updateProduct, deleteProduct, searchProduct } from '../controllers/product.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {verifySeller} from '../middleware/seller.middleware.js';
import validate from '../middleware/validate.middleware.js'
import {createProductSchema} from '../validators/product.validator.js'



const router=Router();
router.post("/create", verifyJWT, verifySeller, validate(createProductSchema), createProduct)

router.get("/my-products", verifyJWT, verifySeller, getMyProducts)

router.get("/", getAllProducts) 

router.get("/search", searchProduct)

router.get("/:id", getSingleProduct)

router.patch("/:id", verifyJWT, verifySeller, validate(createProductSchema), updateProduct)

router.delete("/:id", verifyJWT, verifySeller, deleteProduct)



export default router;