import Wishlist from "../models/wishlist.model.js";
import ApiError from "../utils/ApiError.js";

export const addToWishlistService = async (userId, productId) => {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: userId,
            products: [],
        });
    }

    const productExists = wishlist.products.find((item) => item.product.toString() === productId);
    if (productExists) {
        throw new ApiError(400, 'Product already exists in wishlist');
    }

    wishlist.products.push({ product: productId });
    await wishlist.save();
    return wishlist;
};

export const getWishlistService = async (userId)=>{
    const wishlist = await Wishlist.findOne({
        user:userId,
    }).populate("products.product")

    return wishlist
}

export const removeWishlistService = async (userId, productId)=>{
    const wishlist = await Wishlist.findOne({
        user:userId
    })

    if(!wishlist){
        throw new ApiError(404, "Wishlist not found");
    }

    wishlist.products = wishlist.products.filter((item)=>item.product.toString() !==productId)

    await wishlist.save()

    return wishlist
}