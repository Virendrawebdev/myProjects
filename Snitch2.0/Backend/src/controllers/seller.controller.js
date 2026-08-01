import { becomeSellerService } from "../services/seller.service.js";

export const becomeSeller = async (req, res, next) => {
  try {
    const seller = await becomeSellerService(req.user._id, req.body);

    return res.status(201).json({
      success: true,
      message: "Seller profile created successfully",
      data: seller,
    });
  } catch (error) {
    next(error);
  }
};