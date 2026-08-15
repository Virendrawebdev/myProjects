import Payment from "../models/payment.models.js"
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";
import Product from "../models/product.model.js";

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

  // find successful payment
  const payment = await Payment.findOne({
    _id: paymentId,
    user: userId,
    status: "success",
  });

  if (!payment) {
    throw new ApiError(404, "Successful payment not found");
  }

  // find order
  const order = await Order.findOneAndUpdate(
    {
      _id: payment.order,
      user: userId,
    });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
     console.log('order status:', order.orderStatus)
  if(order.orderStatus==="Confirmed"){
    throw new ApiError(400, "order is alredy confirmed")
   }
  // Decrease product stock
  for(const item of order.products){
    await Product.findOneAndUpdate({_id: item.product},{
      $inc:{
        stock:-item.quantity,
      }
    })
  }

  // update order

  order.paymentStatus="paid";
  order.orderStatus="Confirmed";

  await  order.save();
  return order;
};