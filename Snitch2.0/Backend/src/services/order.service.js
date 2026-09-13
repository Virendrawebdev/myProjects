import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
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
  const validStatuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

  if (!orderStatus || !validStatuses.includes(orderStatus)) {
    throw new ApiError(400, "Invalid order status");
  }

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

export const cancelOrderService = async (orderId, userId) => {
  const order = await Order.findById(orderId).populate({
    path: "products.product",
    populate: {
      path: "seller",
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const actingUser = await User.findById(userId).select("role");
  const isBuyer = order.user.toString() === userId.toString();

  let isSellerOrder = false;
  if (actingUser?.role === "seller") {
    const seller = await Seller.findOne({ user: userId });
    if (seller) {
      isSellerOrder = order.products.some((item) => {
        return (
          item.product &&
          item.product.seller &&
          item.product.seller.toString() === seller._id.toString()
        );
      });
    }
  }

  if (!isBuyer && !isSellerOrder) {
    throw new ApiError(403, "Access denied");
  }

  // Already cancelled?
  if (order.orderStatus === "Cancelled") {
    throw new ApiError(400, "Order is already cancelled");
  }

  // Don't allow cancellation after shipping
  if (
    order.orderStatus === "Shipped" ||
    order.orderStatus === "Delivered"
  ) {
    throw new ApiError(400, "This order cannot be cancelled");
  }

  // Restore stock
  for (const item of order.products) {
    if (item.product) {
      await Product.findOneAndUpdate(
        { _id: item.product._id || item.product },
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }
  }

  // Update order status
  order.orderStatus = "Cancelled";

  await order.save();

  return order;
};