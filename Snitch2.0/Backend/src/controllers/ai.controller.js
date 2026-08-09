import { recommendProductService } from "../services/ai.service.js";

export const recommendProduct = async (req, res, next)=>{
    try{
        const products = await recommendProductService(req.body.prompt)

        return res.status(200).json({
            success:true,
            message:"Product recommend successfully",
            data:products,
        })

    }catch(error){
        next(error);
    }
}