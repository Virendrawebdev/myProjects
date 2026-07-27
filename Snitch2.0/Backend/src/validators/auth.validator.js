import {z} from "zod";

export const registerSchema =z.object({
    fullName:z.string().trim().min(3, "Full name is required"),
    email:z.string().trim().email("Invalid email"),
    password:z.string().min(8, "Password must be at least 8 character"),
    confirmPassword:z.string(),  
})
.refine((data)=>data.password === data.confirmPassword,{
    message:"Password do not match",
    path:["confirmPassword"],
})

export const loginSchema=z.object({
    email:z.string().trim().email("Invalid email"),
    password:z.string().min(8, "Password must be at least 8 characters"),
})