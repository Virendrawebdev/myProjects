import { config } from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import {
  loginUserService,
  logoutUserService,
  refreshAccessTokenService,
  registerUserService,
  googleAuthService,
} from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await loginUserService(req.body);

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
        message: "Login Successful",
        data: user,
      });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User Fetched successfully",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized request");
    }

    await logoutUserService(req.user._id);
    const cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
    };
    return res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is required");
    }

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
};

export const googleCallback = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Google authentication failed");
    }

    const result = await googleAuthService(req.user);

    const cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
    };

    const frontendUrl =
      config.NODE_ENV === "development"
        ? config.GOOGLE_CALLBACK_URL
        : config.FRONTEND_URL || "";
    const destination =
      result.user.role === "seller"
        ? "/seller/dashboard"
        : "/customer/CustomerProducts";

    delete req.session.googleSignupRole;
    delete req.session.googleSignupMode;

    return res
      .cookie("accessToken", result.accessToken, cookieOptions)
      .cookie("refreshToken", result.refreshToken, cookieOptions)
      .redirect(`${frontendUrl}${destination}`);
  } catch (error) {
    console.error("Google callback error:", error);
    next(error);
  }
};