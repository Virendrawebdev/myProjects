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