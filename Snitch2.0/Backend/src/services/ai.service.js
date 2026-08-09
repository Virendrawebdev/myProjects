import {GoogleGenAI} from "@google/genai"
import Product from "../models/product.model.js"
import { config } from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey:config.GEMINI_API_KEY
});

export const recommendProductService = async (prompt) => {
  const products = await Product.find({})
    .select("productName description category price discountPrice")
    .limit(10);

  if (!products.length) {
    return [];
  }
  const productData = products.map((product) => ({
    productId: product._id,
    productName: product.productName,
    description: product.description,
    category: product.category,
    price: product.price,
    discountPrice: product.discountPrice,
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

const text = response.text
.replace(/```json/g, "")
.replace(/```/g, "")
.trim();

const result = JSON.parse(text);

const productIds =result.recommendations.map((item)=>item.productId);

const recommendedProducts = await Product.find({
  _id:{$in:productIds}
}).select("productName description category price discountPrice");
const finalProducts = recommendedProducts.map((product) => {
  const recommendation = result.recommendations.find(
    (item) => item.productId === product._id.toString()
  );

  return {
    ...product.toObject(),
    reason: recommendation?.reason,
  };
});

return finalProducts;
};
