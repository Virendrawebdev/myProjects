import { createProductService, getMyProductsService, getAllProductsService, getSingleProductService, updateProductService, deleteProductService, searchProductService} from "../services/product.service.js";
//create product controller
export const createProduct = async (req, res, next)=>{
    try{
        const product = await createProductService(req.body, req.user._id);
        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:product,
        })

    }catch(error){
        next(error);
    }
}
//get my products controller
export const getMyProducts = async (req, res, next)=>{
    try{
      const products = await getMyProductsService(req.user._id);
      return res.status(200).json({
        success:true,
        message:"Products Fetched successFully",
        data:products,
      })
    }catch(error){
        next(error);
    }
}

//get all products controller
export const getAllProducts = async (req, res, next)=>{
    try{
      const products = await getAllProductsService();
      return res.status(200).json({
        success:true,
        message:"Products Fetched successFully",
        data:products,
      })
    }catch(error){
        next(error);
    }
}

//get single product controller
export const getSingleProduct = async (req, res, next)=>{
  try{
    const product = await getSingleProductService(req.params.id);
    return res.status(200).json({
      success:true,
      message:"Product Fetched successFully",
      data:product,
    })
  }catch(error){
    next(error);
  }
}

//update product controller
export const updateProduct = async (req, res, next) => {
    try {
        const product = await updateProductService(req.params.id, req.body, req.user._id);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
}

//delete product controller
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await deleteProductService(req.params.id, req.user._id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
}

//search product controller
export const searchProduct = async (req, res, next) => {
    try {
        const products = await searchProductService(req.query.search, req.query.category, req.query.minPrice, req.query.maxPrice);
        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
}

