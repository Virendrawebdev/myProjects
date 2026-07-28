import { Router} from 'express';
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import {loginSchema, registerSchema} from '../validators/auth.validator.js'
import { verifyJWT } from '../middleware/auth.middleware.js';


const router =Router();

router.post('/register', validate(registerSchema), registerUser);

router.post('/login', validate(loginSchema), loginUser);

router.get("/me", verifyJWT, getCurrentUser);

router.post('/logout', verifyJWT, logoutUser)

router.post("/refresh-token", refreshAccessToken)

export default router;