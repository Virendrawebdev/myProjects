import { createProductService } from "../services/product.seller.js";

export const createProduct = async (req, res, next)=>{
    try{
        const product = await createProductService(req.body, req.user._id);
        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:product,
        })

    }catch(error){
        next(error);
    }
}