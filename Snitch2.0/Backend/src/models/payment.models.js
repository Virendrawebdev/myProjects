import mongoose, { Types } from "mongoose";

const paymentSchema =new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    order:{
      type:mongoose.Types.ObjectId,
      ref:"Order",
      required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["pending", "success", "failed"],
        default:"pending"
    },
    paymentMethod:{
        type:String,
        enum:["mock"],
        default:"mock"
    }
},{
    timestamps:true,
})

const payment = mongoose.model("Payment", paymentSchema)

export default payment;