import axios from "axios";

export const createSellerProfile = async (sellerData) => {
  const response = await axios.post(
    "/api/seller/become-seller",
    sellerData,
    { withCredentials: true }
  );
  return response.data;
};
