import axios from "axios";

export const getSellerDashboard = async()=>{
    const response = await axios.get("/api/seller/dashboard",{
        withCredentials:true
    })
    return response.data
    
}
