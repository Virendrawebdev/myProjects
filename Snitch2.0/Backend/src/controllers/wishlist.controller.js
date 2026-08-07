import { addToWishlistService, getWishlistService, removeWishlistService } from "../services/wishlist.service.js";


export const addToWishlist = async (req, res, next) => {
    try{
        const wishlist = await addToWishlistService(req.user._id,
            req.body.productId
        )
        return res.status(200).json({
            success:true,
            message:"product added to wishlist successfully",
            data:wishlist,
        })

    }catch(error){
        next(error)
    }
}

export const getWishlist = async (req, res, next)=>{
    try{
        const wishlist = await getWishlistService(req.user._id)

        return res.status(200).json({
            success:true,
            message:"wishlist fetched succesfully",
            data:wishlist
        })

    }catch(error){
        next(error)
    }
}

export const removeWishlist = async (req, res, next) => {
    try {
        const wishlist = await removeWishlistService(req.user._id, req.params.productId);
        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist successfully",
            data: wishlist,
        });
    } catch (error) {
        next(error);
    }
};