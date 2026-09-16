import axios from "axios";

export const getSellerProducts = async () => {
  try {
    const response = await axios.get("/api/products/my-products",{
        withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post("/api/products/create", productData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.patch(`/api/products/${productId}`, productData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/api/products/${productId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
//customer
export const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
