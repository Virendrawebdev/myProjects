import { createPaymentService, markPaymentSuccessService, confirmOrderAfterPaymentService } from "../services/payment.service.js"

export const createPayment = async (req, res, next) => {
    try {
        const payment = await createPaymentService(
            req.user._id,
            req.body.orderId
        )

        return res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment
        })

    } catch (error) {
        next(error)
    }
}

export const markPaymentSuccess = async (req, res, next) => {
    try {
        const payment = await markPaymentSuccessService(
            req.params.paymentId,
            req.user._id
        )
        return res.status(200).json({
            success:true,
            message:"payment successful",
            data:payment
        })

    } catch (error) {
     next(error)
    }
}

export const confirmOrderAfterPayment = async (req, res, next) => {
  try {
    const order = await confirmOrderAfterPaymentService(
      req.params.paymentId,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Order confirmed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};