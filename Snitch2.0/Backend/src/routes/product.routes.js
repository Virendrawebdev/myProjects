import {Router} from 'express';
import { createProduct } from '../controllers/product.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {verifySeller} from '../middleware/seller.middleware.js';
import validate from '../middleware/validate.middleware.js'
import {createProductSchema} from '../validators/product.validator.js'



const router=Router();
router.post("/create", verifyJWT, verifySeller, validate(createProductSchema), createProduct)

export default router;
