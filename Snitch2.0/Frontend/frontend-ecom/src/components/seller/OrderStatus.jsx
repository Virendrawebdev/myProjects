
const OrderStatus = ({ data = [] }) => {
  const getCount = (status) => {
    const item = data.find((item) => item._id === status);
    return item?.count || 0;
  };

  const statuses = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const totalOrders = data.reduce(
    (total, item) => total + item.count,
    0
  );

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Order Status
        </h2>

        <p className="text-sm text-zinc-500">
          Overview of your orders
        </p>
      </div>

      <div className="space-y-5">
        {statuses.map((status) => {
          const count = getCount(status);

          const percentage =
            totalOrders > 0
              ? Math.round((count / totalOrders) * 100)
              : 0;

          return (
            <div key={status}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700">
                  {status}
                </span>

                <span className="text-sm font-semibold text-zinc-900">
                  {count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all duration-500"
                  style={{ width:` ${percentage}% `}}
                />
              </div>

              <p className="mt-1 text-right text-xs text-zinc-400">
                {percentage}%
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-zinc-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">
            Total Orders
          </span>

          <span className="text-lg font-bold text-zinc-900">
            {totalOrders}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;