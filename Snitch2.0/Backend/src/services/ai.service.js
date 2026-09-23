import {GoogleGenAI} from "@google/genai"
import Product from "../models/product.model.js"
import { config } from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey:config.GEMINI_API_KEY
});

export const recommendProductService = async (prompt) => {
  const products = await Product.find({})
    .select("productName description category price discountPrice images brand")
    .limit(10);

  if (!products.length) {
    return [];
  }

  const productData = products.map((product) => ({
    productId: product._id.toString(),
    productName: product.productName,
    description: product.description,
    category: product.category,
    price: product.price,
    discountPrice: product.discountPrice,
    brand: product.brand,
    images: Array.isArray(product.images) ? product.images : [],
  }));

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
User requirement:
${prompt}

Available products:
${JSON.stringify(productData)}

Return ONLY valid JSON in this format:

{
  "recommendations": [
    {
      "productId": "product._id",
      "reason": "short reason"
    }
  ]
}

Recommend only products from the available products.
`,
  });

  const text = (response?.text || "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let result;
  try {
    result = JSON.parse(text);
  } catch (error) {
    console.error("Invalid AI recommendation payload:", text);
    return [];
  }

  const recommendations = Array.isArray(result?.recommendations)
    ? result.recommendations
    : [];

  const productIds = recommendations
    .map((item) => item?.productId)
    .filter(Boolean);

  if (!productIds.length) {
    return [];
  }

  const recommendedProducts = await Product.find({
    _id: { $in: productIds },
  }).select("productName description category price discountPrice images brand");

  const map = new Map(
    recommendedProducts.map((product) => [product._id.toString(), product.toObject()])
  );

  const finalProducts = recommendations
    .map((item) => {
      const product = map.get(String(item.productId));
      if (!product) return null;

      return {
        ...product,
        reason: item.reason || "Recommended for you",
      };
    })
    .filter(Boolean);

  return finalProducts;
};
