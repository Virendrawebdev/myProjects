import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";


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

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

  return {
    user: loggedInUser,
    accessToken,
    refreshToken,
  };
};