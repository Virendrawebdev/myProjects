import axios from "axios";

export const createPayment = async (orderId) => {
  const response = await axios.post(
    "/api/payments",
    { orderId },
    { withCredentials: true }
  );

  return response.data;
};

export const markPaymentSuccess = async (paymentId) => {
  const response = await axios.patch(
    `/api/payments/${paymentId}/success`,
    {},
    { withCredentials: true }
  );

  return response.data;
};

export const confirmOrderAfterPayment = async (paymentId) => {
  const response = await axios.patch(
    `/api/payments/${paymentId}/confirm-order`,
    {},
    { withCredentials: true }
  );

  return response.data;
};