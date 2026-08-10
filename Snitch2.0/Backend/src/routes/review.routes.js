import {Router} from "express";
import { addReview, deleteReview, getProductRating, getProductReviews, updateReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:productId", verifyJWT, addReview)
router.get("/:productId", verifyJWT, getProductReviews)
router.patch("/:productId", verifyJWT, updateReview)
router.delete("/:reviewId", verifyJWT, deleteReview)
router.get("/:productId/rating", verifyJWT, getProductRating)

export default router;
