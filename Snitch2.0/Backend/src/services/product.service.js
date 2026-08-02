import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";


//create product service
export const createProductService = async (productData, userId) => {
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
        throw new Error("Seller not found");
    }
    const product = await Product.create({ ...productData, seller: seller._id });
    return product;
};

//get my products service
export const getMyProductsService = async (userId)=>{
    const seller = await Seller.findOne({user:userId});

if(!seller){
    throw new Error("Seller not found");
}
const products = await Product.find({ seller: seller._id });
return products;
}

//get all products service
export const getAllProductsService = async()=>{
  const products = await Product.find();
  return products;
}

//get single product service
export const getSingleProductService = async(productId)=>{
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

//update product service
export const updateProductService = async (productId, productData, userId) => {
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
        throw new Error("Seller not found");
    }
    const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.seller.toString() !== seller._id.toString()) {
        throw new Error("You are not authorized to update this product");
    }
    return product;
}

//delete product service
export const deleteProductService = async (productId, userId) => {
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
        throw new Error("Seller not found");
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.seller.toString() !== seller._id.toString()) {
        throw new Error("You are not authorized to delete this product");
    }
    await Product.findByIdAndDelete(productId);

}

//search product service
export const searchProductService = async (search, category, minPrice, maxPrice) => {
 const query = {};
  if (search) {
    query.productName = { $regex: search, $options: "i" };
  }
  if (category) {
    query.category = category;
  }
  if(minPrice ||  maxPrice){
    query.price ={};

    if(minPrice){
        query.price.$gte = Number(minPrice);
    }
    if(maxPrice){
        query.price.$lte = Number(maxPrice);
    }
  }
//   console.log(query);
  const products = await Product.find(query);
  return products;
};