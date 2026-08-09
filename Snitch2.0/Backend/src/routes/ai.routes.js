import {Router} from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { recommendProduct } from '../controllers/ai.controller.js';

const router = Router();

router.post("/recommend", verifyJWT, recommendProduct);

export default router;