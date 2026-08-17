import {Router} from 'express';
import { getSellerDashboard } from '../controllers/dashboard.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js'


const router= Router();

router.get("/", verifyJWT, getSellerDashboard)

export default router;