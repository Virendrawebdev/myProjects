import axios from "axios";

export const getSellerOrders = async () => {
  const response = await axios.get("/api/orders/seller", {
    withCredentials: true,
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axios.patch(
    `/api/orders/${orderId}/status`,
    { orderStatus: status },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.patch(
    `/api/orders/${orderId}/cancel`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
