import Payment from "../models/payment.models.js"
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";

export const createPaymentService = async (userId, orderId) => {
    const order = await Order.findOne({
        _id: orderId,
        user: userId,
    })

    if (!order) {
        throw new ApiError(404, "Order not found")
    }

    const payment = await Payment.create({
        user: userId,
        order: orderId,
        amount: order.totalAmount,
        status: "pending",
        paymentMethod: "mock"
    })
    return payment;
}

export const markPaymentSuccessService = async (paymentId, userId) => {
    const payment = await Payment.findOneAndUpdate({
        _id: paymentId,
        user: userId,
        status: "pending",
    },
        {
        status:"success",
        },
        {
            new:true,
            runValidators:true
        }
    )
    if(!payment){
        throw new ApiError(404, "Payment not found");
    }
    return payment
}

export const confirmOrderAfterPaymentService = async (
  paymentId,
  userId
) => {
  const payment = await Payment.findOne({
    _id: paymentId,
    user: userId,
    status: "success",
  });

  if (!payment) {
    throw new ApiError(404, "Successful payment not found");
  }

  const order = await Order.findOneAndUpdate(
    {
      _id: payment.order,
      user: userId,
    },
    {
      paymentStatus: "paid",
      status: "Confirmed",
    },
    {
      new: true,
    }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};