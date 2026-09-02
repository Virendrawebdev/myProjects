const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      
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

        <button className="text-sm font-medium text-zinc-900 hover:underline">
          View all
        </button>
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="
                flex flex-col gap-3
                rounded-xl border border-zinc-100 p-4
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Order info */}
              <div>
                  <div className="flex items-end justify-between gap-4 sm:justify-start sm:gap-8">
                  <p className="font-medium text-zinc-900">
                  Order #{order._id.slice(-6)}
                </p>
                 <p className="font-medium  text-zinc-900">
                  Customer: {order.user?.fullName || "Customer"}
                </p>
              </div>
  
                <p className="text-sm text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Amount + Status */}
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="font-semibold text-zinc-900">
                  ₹{order.totalAmount}
                </span>

                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium">
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