import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";


export const verifyJWT = async(req, res, next) =>{
    try{
        const token= req.cookies?.accessToken || req.get("Authorization")?.replace("Bearer ", "");
        // console.log(req.cookies)
        // console.log("typeof", typeof req.cookies)
        // console.log(token)
        // console.log("typeof", typeof token)
        if(!token){
            throw new ApiError(401, "Unauthorized request");
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