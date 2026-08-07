import {Router} from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addToWishlist, getWishlist, removeWishlist } from "../controllers/wishlist.controller.js";


const router = Router();

router.post("/", verifyJWT, addToWishlist)
router.get("/", verifyJWT, getWishlist)
router.delete("/:productId", verifyJWT, removeWishlist)

export default router;