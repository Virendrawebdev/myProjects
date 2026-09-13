import React, { useEffect, useState } from "react";
import Sidebar from "../../components/seller/Sidebar";
import { getSellerOrders, updateOrderStatus, cancelOrder } from "../../services/order.api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStatusStyle = (orderStatus) => {
        switch (orderStatus) {
            case "Delivered":
                return "bg-green-100 text-green-700";

            case "Confirmed":
                return "bg-blue-100 text-blue-700";

            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "Cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-zinc-100 text-zinc-700";
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await getSellerOrders();

            console.log("Seller orders:", response);

            setOrders(response.data || []);
        } catch (error) {
            console.error("Orders error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, orderStatus) => {
        try {
            await updateOrderStatus(orderId, orderStatus);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, orderStatus: orderStatus }
                        : order
                )
            );
        } catch (error) {
            console.error("Status update error:", error);
            alert(
                error.response?.data?.message || "Failed to update status"
            );
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, orderStatus: "Cancelled" }
                        : order
                )
            );
        } catch (error) {
            console.error("Cancel order error:", error);
            alert(
                error.response?.data?.message || "Failed to cancel order"
            );
        }
    };

    return (
        <div className="sm:flex min-h-screen min-w-0 bg-[#f4f5ef]">
            <Sidebar dashboard={false} />

            <main className="ml-0 min-h-screen p-4 md:ml-20 md:p-6">
                <h1 className="text-2xl font-semibold text-zinc-900">
                    Orders
                </h1>

                {loading ? (
                    <p className="mt-6 text-zinc-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="mt-6 text-zinc-500">No orders found.</p>
                ) : (
                    <div className="mt-6">


                        <div className="space-y-3">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="rounded-2xl border border-zinc-200 bg-white p-4"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-medium text-zinc-900">
                                                Order #{order._id.slice(-6)}
                                            </p>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-6 sm:justify-end">
                                            <div>
                                                <p className="text-xs text-zinc-500">Amount</p>
                                                <p className="font-semibold text-zinc-900">
                                                    ₹{order.totalAmount}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-zinc-500">Status</p>
                                                {/* <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                                        order.orderStatus
                                                    )}`}
                                                >
                                                    {order.orderStatus}
                                                </span> */}
                                                <select
                                                    value={order.orderStatus}
                                                    onChange={(e) =>
                                                        handleStatusChange(order._id, e.target.value)
                                                    }
                                                    className={`rounded-full px-3 py-1 text-xs font-medium outline-none ${getStatusStyle(
                                                        order.orderStatus
                                                    )}`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                                {order.orderStatus !== "Cancelled" && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Orders;