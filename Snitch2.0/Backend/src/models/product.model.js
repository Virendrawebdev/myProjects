import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true,
            trim:true
        },
         description:{
            type:String,
            required:true,
            trim:true
        },
        brand:{
            type:String,
            required:true,
            trim:true
        },
        category:{
           type:String,
            required:true,
            trim:true
        },
         price:{
           type:Number,
            required:true,
            min:0
        },
        discountPrice:{
           type:Number,
            default:0,
            min:0
        },
        stock:{
          type:Number,
            required:true,
            min:0  
        },
        images:[{
          type:String,
        }],
        seller:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Seller",
            required:true,
        },
        isPublished:{
            type:Boolean,
            default:false,
        },
        ratings:{
            type:Number,
            default:0,
            min:0,
            max:5
        },
        totalReviews:{
            type:Number,
            default:0,
        }
},{
timestamps:true,
}
)

const Product = mongoose.model("Product", productSchema)
export default Product;