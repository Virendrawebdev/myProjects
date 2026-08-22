import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";

export const getsellerDashboardService = async (sellerUserId)=>{
    const totalProducts = await Product.countDocuments({
        sellerUserId:sellerUserId
    })

    const totalOrders =await Order.countDocuments({
        sellerUserId:sellerUserId
    })

    const pendingOrders = await Order.countDocuments({
        sellerUserId:sellerUserId,
        orderStatus:"Pending",
    })

    const deliveredOrders = await Order.countDocuments({
       sellerUserId:sellerUserId,
        orderStatus:"Delivered",
    })

    const lowestStockProducts= await Product.findOne({
        sellerUserId,
        stock:{$lte:5},
    }).select("productName stock")

    const sales = await Order.aggregate([
        {
            $match:{
                sellerUserId:sellerUserId,
                orderStatus:"Delivered"
            }
        },
        {
            $group:{
                _id:null,
                totalSales:{
                    $sum:"$totalAmount"
                }
            }
        }
    ])
   // revenueOverview
    const revenueOverview = await Order.aggregate([
        {
            $match:{
                sellerUserId:sellerUserId,
                orderStatus:"Delivered",
            }
        },
        
        {
            $group:{
                _id:{
                    $dateToString:{
                        format:"%Y-%m-%d",
                        date:"$createdAt",
                    }
                },
                revenue:{
                    $sum:"$totalAmount"
                }
            }
        },
        {
            $sort:{
                _id:1,
            }
        }
    ])


    return {
        totalProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalSales:sales[0]?.totalSales||0,
        revenueOverview,
        lowestStockProducts
    }


}