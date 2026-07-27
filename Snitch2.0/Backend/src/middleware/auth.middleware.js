import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";


export const verifyJWT = async(res, req, next) =>{
    try{
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        if(!token){
            throw new ApiError(401, "Unathorized request");
        }
        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if (!user){
            throw new ApiError(401, "Invalid AccessToken")
        }
        req.user = user;
        next();

    }catch(error){
        next(error)
    }
}