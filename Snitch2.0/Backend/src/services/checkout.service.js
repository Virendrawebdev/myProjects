import Cart from "../models/cart.model.js";
import ApiError from "../utils/ApiError.js";


export const checkoutService = async (userId) => {
    const cart = await Cart.findOne({ user:userId,
     }).populate("products.product");
     if (!cart || cart.products.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }

    let totalAmount = 0;
    cart.products.forEach((item) => {
        totalAmount += item.product.price * item.quantity;
    });
    
    return { totalAmount, cart };
};