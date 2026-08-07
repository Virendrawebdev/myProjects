import {Router} from "express";
import { checkout } from "../controllers/checkout.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",verifyJWT, checkout);

export default router;