import { Link } from "react-router-dom";

const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:p-6">
      
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Orders
          </h2>

          <p className="text-sm text-zinc-500">
            Latest orders from your store
          </p>
        </div>

        <Link to="/seller/orders" className="text-sm font-medium text-zinc-900 hover:underline">
          View all
        </Link>
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-100 p-4 transition hover:border-zinc-200 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Order info */}
              <div>
                  <p className="font-medium text-zinc-900">Order #{order._id.slice(-6)}</p>
                  <p className="mt-1 text-sm text-zinc-500">{order.user?.fullName || "Customer"}</p>
  
                <p className="text-sm text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Amount + Status */}
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="font-semibold text-zinc-900">
                  ₹{order.totalAmount}
                </span>

                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  order.orderStatus === "Delivered" ? "bg-emerald-50 text-emerald-700" :
                  order.orderStatus === "Cancelled" ? "bg-red-50 text-red-700" :
                  order.orderStatus === "Shipped" ? "bg-blue-50 text-blue-700" :
                  "bg-amber-50 text-amber-700"
                }`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-zinc-500">
            No recent orders
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;