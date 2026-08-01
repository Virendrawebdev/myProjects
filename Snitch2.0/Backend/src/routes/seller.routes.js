import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {becomeSellerSchema} from "../validators/seller.validator.js";
import {becomeSeller} from "../controllers/seller.controller.js";

const router = Router();

router.post(
  "/become-seller",
  verifyJWT,
  validate(becomeSellerSchema),
  becomeSeller
);

export default router;