import ApiError from "../utils/ApiError.js";


export const verifySeller=(req, res, next)=>{
    if(req.user.role !=="seller"){
        return next (new ApiError(403, "Access Denied. Seller only."))
    }
    next();
}