import {z} from  "zod";

export const createProductSchema = z.object({
    productName:z.string().trim().min(3, "Product name Must be at least 3 characters")
    .max(20, "product name cannot exceed 20 Characters"),
    description:z.string().trim()
    .min(10, "Product name Must be at least 10 characters")
    .max(50, "product name cannot exceed 50 Characters"),
    brand:z.string().trim().min(2, "Brand is required"),
    category:z.string().trim().min(2, "Category is required"),
    price:z.number().positive("price must be greater than 0"),
    discountPrice:z.number().min(0, "Discount Price cannot be negative").optional(),
    stock:z.number().int().min(0, "Stock cannot be negative"),
    images: z.array(z.string().url("invalid image URL"))
    .min(1, "At least  one image is required")
})