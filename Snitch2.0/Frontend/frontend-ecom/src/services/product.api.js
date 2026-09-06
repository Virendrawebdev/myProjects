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
