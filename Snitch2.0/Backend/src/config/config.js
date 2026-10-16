import { configDotenv } from "dotenv";
configDotenv();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    NODE_ENV: process.env.NODE_ENV,
    SESSION_SECRET: process.env.SESSION_SECRET || "snitch-session-secret",
    FRONTEND_URL: process.env.FRONTEND_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL?.trim() || "http://localhost:3000/api/auth/google/callback"
}
