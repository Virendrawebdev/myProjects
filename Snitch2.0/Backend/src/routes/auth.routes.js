import { Router} from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import {loginSchema, registerSchema} from '../validators/auth.validator.js'
import { verifyJWT } from '../middleware/auth.middleware.js';


const router =Router();

router.post('/register', validate(registerSchema), registerUser);

router.post('/login', validate(loginSchema), loginUser);

router.get("/me", verifyJWT, getCurrentUser);

export default router;