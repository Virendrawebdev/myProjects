import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";

export const createProductService = async (productData, userId) => {
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
        throw new Error("Seller not found");
    }
    const product = await Product.create({ ...productData, seller: seller._id });
    return product;
};