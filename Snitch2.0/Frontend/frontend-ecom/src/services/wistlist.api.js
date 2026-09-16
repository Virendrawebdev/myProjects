import axios from "axios";

export const addToWishlist = async (productId) => {
  const response = await axios.post(
    "/api/wishlist",
    { productId },
    { withCredentials: true }
  );

  return response.data;
};

export const getWishlist = async () => {
  const response = await axios.get(
    "/api/wishlist",
    { withCredentials: true }
  );

  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await axios.delete(
    `/api/wishlist/${productId}`,
    { withCredentials: true }
  );

  return response.data;
};