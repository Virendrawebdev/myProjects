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
    <div className="rounded-2xl border border-zinc-200 bg-white">

      <div className="flex items-center justify-between border-b border-zinc-200 p-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Latest orders from your store
          </p>
        </div>

        <button className="text-sm font-medium text-zinc-900 hover:underline">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">

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