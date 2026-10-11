import { getMyOrders, cancelOrder } from '../../services/order.api';
import { useEffect, useState } from 'react';
import CustomerHeader from '../../components/customer/CustomerHeader';
import StorefrontFooter from '../../components/customer/StorefrontFooter';
import { Link } from 'react-router-dom';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrders = async () => {
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
        loadOrders();
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
        return <><CustomerHeader /><main className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f4] text-sm text-zinc-500">Loading your orders...</main><StorefrontFooter /></>;
    }

    if (error) {
        return <><CustomerHeader /><main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-10"><div className="mx-auto max-w-5xl rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div></main><StorefrontFooter /></>;
    }

    if (!orders.length) {
        return <><CustomerHeader /><main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-10"><div className="mx-auto max-w-5xl rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center"><p className="text-lg font-semibold text-zinc-900">Your next favourite is out there.</p><p className="mt-2 text-sm text-zinc-500">Your orders will show here once you find it.</p><Link to="/customer/CustomerProducts" className="mt-5 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white">Explore products</Link></div></main><StorefrontFooter /></>;
    }

    return (
        <>
            <CustomerHeader />
     
        <main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-[#e8eddb] px-5 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">The latest</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Your orders</h1>
            <p className="mt-2 text-sm text-zinc-600">Track the pieces on their way to you.</p>
        </div>
        <div className="space-y-4">

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
        </div>
        </main>
        <StorefrontFooter />
           </>
    );
};

export default CustomerOrders;