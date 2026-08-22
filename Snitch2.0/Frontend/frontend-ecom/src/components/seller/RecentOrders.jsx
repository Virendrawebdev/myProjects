const orders = [
  {
    id: "#SN1024",
    customer: "Rahul Sharma",
    product: "Running Shoes",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#SN1023",
    customer: "Amit Patil",
    product: "Oversized T-Shirt",
    amount: "₹999",
    status: "Pending",
  },
  {
    id: "#SN1022",
    customer: "Neha Singh",
    product: "Denim Jacket",
    amount: "₹1,899",
    status: "Shipped",
  },
  {
    id: "#SN1021",
    customer: "Rohit Kumar",
    product: "Sneakers",
    amount: "₹3,299",
    status: "Delivered",
  },
];

const getStatusStyle = (status) => {
  if (status === "Delivered") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "Pending") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-blue-50 text-blue-700";
};

const RecentOrders = () => {
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white">

      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 p-4 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Latest orders from your store
          </p>
        </div>

        <button className="shrink-0 text-sm font-medium text-zinc-900 hover:underline">
          View all
        </button>
      </div>

      <div className="divide-y divide-zinc-100 sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="space-y-3 px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900">{order.id}</p>
                <p className="mt-1 truncate text-xs text-zinc-500">{order.customer}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="truncate text-zinc-500">{order.product}</span>
              <span className="shrink-0 font-semibold text-zinc-900">{order.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden w-full overflow-x-auto overscroll-x-contain sm:block">
        <table className="w-full min-w-xl text-left text-sm">

          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase tracking-wider text-zinc-400">
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                  {order.id}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-600">
                  {order.customer}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-600">
                  {order.product}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                  {order.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RecentOrders;