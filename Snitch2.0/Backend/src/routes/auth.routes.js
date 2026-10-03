import { Router } from 'express';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  googleCallback
} from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import passport from '../config/passport.js';
import { config } from '../config/config.js';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect:
      config.NODE_ENV === 'development'
        ? 'http://localhost:5173/login'
        : '/login',
  }),
  googleCallback
);

router.get('/me', verifyJWT, getCurrentUser);
router.post('/logout', verifyJWT, logoutUser);
router.post('/refresh-token', refreshAccessToken);

export default router;