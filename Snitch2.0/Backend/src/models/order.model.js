import mongoose from 'mongoose';

const  orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        product:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Product',
          required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1,
        }
    }],
    totalAmount:{
        type:Number,
        required:true,
    },
    shippingAddress:{
        fullName:{
            type:String,
            required:true,
            trim:true
        },
        phone:{
            type:String,
            required:true,
            trim:true
        },
        addressLine:{
            type:String,
            required:true,
            trim:true
        },
        city:{
            type:String,
            required:true,
            trim:true
        },
        state:{
            type:String,
            required:true,
            trim:true
        },
        pincode:{
            type:String,
            required:true,
            trim:true
        }
    },
    paymentMethod:{
        type:String,
        enum:['COD', 'Online', 'Mock'],
        default:'COD',
    },
    orderStatus:{
        type:String,
        enum:['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default:'Pending',
    }
},
{
    timestamps:true
})

const Order = mongoose.model('Order', orderSchema);
export default Order;