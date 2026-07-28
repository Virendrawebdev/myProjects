import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";
import { config } from "../config/config.js";
import jwt from 'jsonwebtoken'


export const registerUserService =async (userData)=>{
    const {fullName, email, password, role} =userData;

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ApiError(409, "Email already exists")
    }
    const user =  await User.create({
        fullName,
        email,
        password,
        role
    });
    const createUser= await User.findById(user._id).select("-password");
    return createUser;
};

export const loginUserService = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken =await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  // console.log(accessToken)
  // console.log(typeof accessToken)
  // console.log(refreshToken)
  // console.log(typeof refreshToken)

  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

  return {
    user:loggedInUser,
    accessToken,
    refreshToken,
  };
};

export const logoutUserService = async(userId) =>{
  await User.findByIdAndUpdate(userId, {
    $set:{
      refreshToken:null,
    }
  })
}

export const refreshAccessTokenService = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "refresh token is required");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(incomingRefreshToken, config.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decodedToken._id).select("+refreshToken");

  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh token expired or invalid");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  return {
    accessToken,
    refreshToken,
  };
} 