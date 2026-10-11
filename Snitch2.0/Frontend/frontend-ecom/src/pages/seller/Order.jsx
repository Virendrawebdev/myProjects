import { useEffect, useState } from "react";
import Sidebar from "../../components/seller/Sidebar";
import Header from "../../components/seller/Header";
import { getSellerOrders, updateOrderStatus, cancelOrder } from "../../services/order.api";
import { getSellerDashboard } from "../../services/dashboard.api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sellerDashboard, setSellerDashboard] = useState(null);

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

    useEffect(() => {
        getSellerOrders()
            .then((response) => setOrders(response.data || []))
            .catch((error) => console.error("Orders error:", error))
            .finally(() => setLoading(false));
        getSellerDashboard()
            .then((response) => setSellerDashboard(response.data))
            .catch((error) => console.error("Seller profile error:", error));
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
        <div className="min-h-screen min-w-0 bg-[#f4f5ef] lg:flex">
            <Sidebar dashboard={sellerDashboard} />

            <div className="min-w-0 flex-1">
            <Header dashboard={sellerDashboard} />
            <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
                <div className="mx-auto max-w-7xl">
                <section className="mb-6 flex flex-col justify-between gap-4 rounded-3xl bg-[#e8eddb] p-5 sm:flex-row sm:items-end sm:p-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Fulfilment</p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">Orders</h1>
                        <p className="mt-2 text-sm text-zinc-600">Review purchases and keep customers up to date.</p>
                    </div>
                    <span className="w-fit rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-700">{orders.length} total</span>
                </section>

                {loading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }, (_, index) => <div key={index} className="h-24 animate-pulse rounded-2xl bg-white" />)}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
                        <p className="text-lg font-semibold text-zinc-900">No orders yet</p>
                        <p className="mt-2 text-sm text-zinc-500">New customer orders will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-semibold text-zinc-900">
                                                Order #{order._id.slice(-6)}
                                            </p>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end sm:gap-6">
                                            <div>
                                                <p className="text-xs text-zinc-500">Amount</p>
                                                <p className="font-semibold text-zinc-900">
                                                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-zinc-500">Status</p>
                                                <select
                                                    aria-label={`Update status for order ${order._id.slice(-6)}`}
                                                    value={order.orderStatus}
                                                    onChange={(e) =>
                                                        handleStatusChange(order._id, e.target.value)
                                                    }
                                                    className={`mt-1 rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ring-1 ring-inset ring-black/5 ${getStatusStyle(
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
                                                        type="button"
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        className="mt-1 rounded-full px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
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
                )}
                </div>
            </main>
            </div>
        </div>
    );
};

export default Orders;