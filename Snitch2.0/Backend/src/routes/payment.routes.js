import {Router} from "express";
import { verifyJWT } from '../middleware/auth.middleware.js';
import { confirmOrderAfterPayment, createPayment, markPaymentSuccess } from "../controllers/payment.controller.js";


const router =Router();

router.post("/", verifyJWT, createPayment)
router.patch("/:paymentId/success", verifyJWT, markPaymentSuccess)
router.patch("/:paymentId/confirm-order", verifyJWT, confirmOrderAfterPayment)

export default router;