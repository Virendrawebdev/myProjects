import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const becomeSellerService = async (userId, sellerData)=>{
     const existingSeller = await Seller.findOne({ user: userId });

    if (existingSeller) {
        throw new ApiError(400, "You are already a seller");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const shopSlug = sellerData.shopName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    const seller = await Seller.create({
        user: user._id,
        ...sellerData,
        shopSlug,
    });

    user.role = "seller";

    await user.save({ validateBeforeSave: false });

    return seller;
}