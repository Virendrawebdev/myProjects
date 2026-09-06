import { z } from "zod";

export const createProductSchema = z.object({
    productName: z.string().trim()
        .min(3, "Product name must be at least 3 characters")
        .max(20, "Product name cannot exceed 20 characters"),
    description: z.string().trim()
        .min(10, "Product description must be at least 10 characters")
        .max(200, "Product description cannot exceed 200 characters"),
    brand: z.string().trim().min(2, "Brand is required"),
    category: z.string().trim().min(2, "Category is required"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    discountPrice: z.coerce.number().min(0, "Discount price cannot be negative").optional().or(z.literal("")),
    stock: z.coerce.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
    images: z.array(z.string().trim().url("Invalid image URL"))
        .min(1, "At least one image is required")
});