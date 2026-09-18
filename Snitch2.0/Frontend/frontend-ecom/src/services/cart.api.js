import axios from "axios";

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(
    "/api/cart",
    { productId, quantity },
    { withCredentials: true }
  );

  return response.data;
};

export const getCart = async () => {
  const response = await axios.get(
    "/api/cart",
    { withCredentials: true }
  );

  return response.data;
};

export const updateCartQuantity = async (productId, quantity) => {
  const response = await axios.patch(
    "/api/cart",
    { productId, quantity },
    { withCredentials: true }
  );

  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axios.delete(
    `/api/cart/${productId}`,
    { withCredentials: true }
  );

  return response.data;
};