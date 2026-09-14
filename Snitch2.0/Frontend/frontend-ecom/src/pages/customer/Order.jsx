import React from 'react'
import { getMyOrders, cancelOrder } from '../../services/order.api';
import { useEffect, useState } from 'react';
import CustomerHeader from '../../components/customer/CustomerHeader';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await getMyOrders();
            setOrders(response?.data || []);
            setError("");
        } catch (error) {
            console.error("Orders error:", error);
            setError(error?.response?.data?.message || "Unable to load your orders.");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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
            alert(error.response?.data?.message || "Failed to cancel order");
        }
    };

    if (loading) {
        return <div className="mt-6 text-center text-sm text-zinc-500">Loading your orders...</div>;
    }

    if (error) {
        return <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>;
    }

    if (!orders.length) {
        return <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">No orders yet.</div>;
    }

    return (
        <>
            <CustomerHeader />
     
        <div className="mt-6 space-y-4">

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-medium text-zinc-900">
                                Order #{order._id.slice(-6)}
                            </p>

                            <p className="mt-1 text-sm text-zinc-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <p className="text-xs text-zinc-500">Amount</p>
                                <p className="font-semibold text-zinc-900">
                                    ₹{order.totalAmount}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500">Status</p>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${order.orderStatus === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.orderStatus === "Cancelled"
                                            ? "bg-red-100 text-red-700"
                                            : order.orderStatus === "Shipped"
                                                ? "bg-purple-100 text-purple-700"
                                                : order.orderStatus === "Confirmed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {order.orderStatus}
                                </span>
                                {["Pending", "Confirmed"].includes(order.orderStatus) && (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        className="mt-3 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
           </>
    );
};

export default CustomerOrders;