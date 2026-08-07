import { checkoutService } from "../services/checkout.service.js";

export const checkout = async(req,res,next)=>{
    try{
        const checkoutData = await checkoutService(req.user.id);
       return res.status(200).json({
            success:true,
            data:checkoutData
       })
    }catch(error){
        next(error)
    }
}