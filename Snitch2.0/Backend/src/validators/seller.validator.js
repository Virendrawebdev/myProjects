import { z } from "zod";

export const becomeSellerSchema = z.object({
  shopName: z
    .string()
    .trim()
    .min(3, "Shop name must be at least 3 characters")
    .max(50, "Shop name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description cannot exceed 500 characters"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

  address: z
    .string()
    .trim()
    .min(10, "Address is required"),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  state: z
    .string()
    .trim()
    .min(2, "State is required"),

  country: z
    .string()
    .trim()
    .default("India"),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode"),

  upiId: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/, "Invalid UPI ID"),
});