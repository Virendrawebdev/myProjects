import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import ApiError from "../utils/ApiError.js";

export const getsellerDashboardService = async (sellerUserId) => {
    const seller = await Seller.findOne({ user: sellerUserId }).select("_id");
    if (!seller) {
        throw new ApiError(404, "Seller profile not found");
    }

    const sellerProducts = await Product.find({ seller: seller._id })
        .select("_id productName stock");
    const productIds = sellerProducts.map((product) => product._id);
    const sellerOrders = await Order.find({
        "products.product": { $in: productIds },
    }).populate("user", "fullName");

    const totalProducts = sellerProducts.length;
    const totalOrders = sellerOrders.length;
    const pendingOrders = sellerOrders.filter(
        (order) => order.orderStatus === "Pending"
    ).length;
    const deliveredOrders = sellerOrders.filter(
        (order) => order.orderStatus === "Delivered"
    ).length;

    const lowestStockProducts = sellerProducts
        .filter((product) => product.stock <= 5)
        .sort((first, second) => first.stock - second.stock)
        .slice(0, 5)
        .map((product) => ({
            productName: product.productName,
            stock: product.stock,
        }));

    const deliveredOrdersList = sellerOrders.filter(
        (order) => order.orderStatus === "Delivered"
    );
    const totalSales = deliveredOrdersList.reduce(
        (total, order) => total + order.totalAmount,
        0
    );

    const revenueByDate = new Map();
    deliveredOrdersList.forEach((order) => {
        const date = order.createdAt.toISOString().slice(0, 10);
        revenueByDate.set(date, (revenueByDate.get(date) || 0) + order.totalAmount);
    });
    const revenueOverview = [...revenueByDate]
        .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
        .map(([date, revenue]) => ({ _id: date, revenue }));

    const recentOrders = sellerOrders
        .sort((first, second) => second.createdAt - first.createdAt)
        .slice(0, 5)
        .map((order) => ({
            _id: order._id,
            totalAmount: order.totalAmount,
            products: order.products,
            orderStatus: order.orderStatus,
            createdAt: order.createdAt,
            user: order.user,
        }));

    const orderStatusOverview = [...sellerOrders.reduce((statusCounts, order) => {
        statusCounts.set(
            order.orderStatus,
            (statusCounts.get(order.orderStatus) || 0) + 1
        );
        return statusCounts;
    }, new Map())].map(([status, count]) => ({ _id: status, count }));

    const user = await User.findById(sellerUserId).select("fullName");
    return {
        seller: {
            fullName: user?.fullName || "Seller",
        },
        totalProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalSales,
        revenueOverview,
        lowestStockProducts,
        recentOrders,
        orderStatusOverview,
    };
};
