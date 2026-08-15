import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Seller from "../models/seller.model.js";
import ApiError from "../utils/ApiError.js";

export const placeOrderService = async(userId, shippingAddress, paymentMethod) => {
   const cart = await Cart.findOne({
    user:userId, 
   }).populate("products.product");
   if(!cart || cart.products.length === 0){
    throw new ApiError(400, "Cart is empty");
   }
   let totalAmount = 0;
   cart.products.forEach((item) => {
    if(item.product.stock <item.quantity){
      throw new ApiError(400, `Insufficient stock for ${item.product.productName}`)
    }
    const price= item.product.discountPrice ? item.product.discountPrice : item.product.price;
    totalAmount += price * item.quantity;
   });
   const order = await Order.create({
    user: userId,
    products: cart.products,
    totalAmount,
    shippingAddress,
    paymentMethod
   });
   cart.products = [];
   await cart.save();
   return order;
};

export const getOrdersService = async(userId) => {
    const orders = await Order.find({user:userId}).populate("products.product");
    return orders;
}

export const getSellerOrdersService = async (sellerUserId) => {
  const seller = await Seller.findOne({ user: sellerUserId });
  if (!seller) {
    throw new ApiError(404, "Seller profile not found");
  }

  const orders = await Order.find()
    .populate("user", "fullName email")
    .populate({
      path: "products.product",
      model: "Product",
    });

  const sellerOrders = [];

  orders.forEach((order) => {
    const sellerProducts = order.products.filter((item) => {
      if (!item.product) return false;

      return item.product.seller?.toString() === seller._id.toString();
    });

    if (sellerProducts.length > 0) {
      sellerOrders.push({
        _id: order._id,
        user: order.user,
        products: sellerProducts,
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      });
    }
  });

  return sellerOrders;

};

export const updateOrderStatusService = async (
  orderId,
  sellerUserId,
  orderStatus
) => {
  const seller = await Seller.findOne({ user: sellerUserId });
  if (!seller) {
    throw new ApiError(404, "Seller profile not found");
  }

  const order = await Order.findById(orderId).populate({
    path: "products.product",
    populate: {
      path: "seller",
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const isSellerOrder = order.products.some((item) => {
    return (
      item.product &&
      item.product.seller &&
      item.product.seller.toString() === seller.toString()
    );
  });

  if (!isSellerOrder) {
    throw new ApiError(403, "Access denied");
  }

  order.orderStatus = orderStatus;

  await order.save();

  return order;
};