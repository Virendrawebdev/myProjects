import { config } from "../config/config.js";
import { loginUserService, registerUserService } from "../services/auth.service.js"

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