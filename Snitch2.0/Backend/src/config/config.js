import { configDotenv } from "dotenv";
configDotenv();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY,
    NODE_ENV:process.env.NODE_ENV
}