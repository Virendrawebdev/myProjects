import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";


export const addToCartService = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    const cart = await Cart.findOne({ user: userId });
    
    if(!cart){
        cart = await Cart.create({
            user: userId,
            products: [{ product: productId, quantity: quantity || 1 }]
        })
    }
    const existingProduct =cart.products.find((item)=>item.product.toString()===productId);
    if(existingProduct){
        existingProduct.quantity += quantity || 1;
    }else{
        cart.products.push({ product: productId, quantity: quantity || 1 });
    }
    await cart.save();
    return cart;
}

export const getCartService = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    return cart;
}

export const updateCartQuantityService = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    const existingProduct = cart.products.find((item) => item.product.toString() === productId);
    if (!existingProduct) {
        throw new ApiError(404, "Product not found in cart");
    }
    if (quantity < 1) {
        throw new ApiError(400, "Quantity must be at least 1");
    }
    existingProduct.quantity = quantity;
    await cart.save();
    return cart;
}

export const removeFromCartService = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    cart.products = cart.products.filter((item) => item.product.toString() !== productId);
    await cart.save();
    return cart;
}