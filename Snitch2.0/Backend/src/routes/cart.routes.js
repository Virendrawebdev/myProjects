import {Router} from "express";
import { addToCart, getCart, updateCartQuantity, removeFromCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/", verifyJWT, addToCart);
router.get("/", verifyJWT, getCart);
router.patch("/", verifyJWT, updateCartQuantity);
router.delete("/:productId", verifyJWT, removeFromCart);


export default router;