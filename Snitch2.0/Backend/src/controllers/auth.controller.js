import { success } from "zod";
import { config } from "../config/config.js";
import { loginUserService, logoutUserService, refreshAccessTokenService, registerUserService } from "../services/auth.service.js"

export const registerUser = async (req, res, next)=>{
 try{
    const user = await registerUserService(req.body);
    return res.status(201).json({
        success:true,
        message:"User registered Successfully",
        data:user,
    })
 }catch(error){
   next(error);
 }
}

export const loginUser = async (req, res, next)=>{
  try{
    const {user, accessToken, refreshToken} =await loginUserService(req.body);

    const cookieOptions ={
      httpOnly:true,
      secure:config.NODE_ENV === "production",
      sameSite:"lax"
    };

    return res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      success:true,
      message:"Login Successful",
      data:user,
    })

  }catch(error){
    next(error);
  }

}

export const getCurrentUser = async (req, res, next)=>{
  try{
    return res.status(200).json({
      success:true,
      message:"User Fetched successfully",
      data:req.user,
    })

  }catch(error){
    next(error);
  }
}

export const logoutUser = async(req, res, next)=>{
  try{

  await logoutUserService(req.user._id);
    const cookieOptions ={
      httpOnly:true,
      secure:config.NODE_ENV === "production",
      sameSite:"lax"
    };
    return res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(200)
    .json({
      success:true,
      message:"Logout successful"
    })



  }catch(error){
    next(error)
  }
}

export const refreshAccessToken = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;

    const { accessToken, refreshToken } =
      await refreshAccessTokenService(incomingRefreshToken);

    const cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "Access token refreshed successfully",
      });
  } catch (error) {
    next(error);
  }
}