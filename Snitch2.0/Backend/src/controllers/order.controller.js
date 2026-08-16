import {placeOrderService, getOrdersService, getSellerOrdersService, updateOrderStatusService, cancelOrderService} from "../services/order.service.js";

export const placeOrder = async (req, res, next)=>{
    try{
        const order = await placeOrderService(req.user._id,
            req.body.shippingAddress,
            req.body.paymentMethod
        );
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        });

    }catch(error){
        next(error);
    }
}

export const getMyOrders = async (req, res, next)=>{
    try{
        const orders = await getOrdersService(req.user._id);
        return res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders
        });
    }catch(error){
        next(error);
    }
}

export const getSellerOrders = async (req, res, next)=>{
    try{
        const orders = await getSellerOrdersService(req.user._id);
        return res.status(200).json({
            success: true,
            message: "Seller orders retrieved successfully",
            data: orders
        });
    }catch(error){
        next(error);
    }
}

export const updateOrderStatus = async (req, res, next)=>{
    try{
        const order = await updateOrderStatusService(req.params.orderId, req.user._id, req.body.orderStatus);
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });
    }catch(error){
        next(error);
    }
}

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await cancelOrderService(
      req.params.orderId,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
