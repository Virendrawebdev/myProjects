import { getsellerDashboardService } from "../services/dashboard.service.js"


export const getSellerDashboard = async(req, res, next)=>{
    try{
    const dashboard = await getsellerDashboardService(req.user.sellerUserId)

    return res.status(200).json({
        success:true,
        message:"seller dashboard fetched successfully",
        data:dashboard
    })
}catch(error){
    next(error)
}
}