import { addToCartService, getCartService, updateCartQuantityService, removeFromCartService } from "../services/cart.service.js";

export const addToCart =async (req, res, next) =>{
    try{
    const cart = await addToCartService(req.user._id, req.body.productId, req.body.quantity);
    return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        data: cart,
    })
    }catch(error){
        next(error);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const cart = await getCartService(req.user._id);
        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCartQuantity = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await updateCartQuantityService(req.user._id, productId, quantity);
        return res.status(200).json({
            success: true,
            message: "Cart quantity updated successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cart = await removeFromCartService(req.user._id, productId);
        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};
