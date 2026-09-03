const LowStock = ({ products = [] }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-900">
          Low Stock Products
        </h2>

        <p className="text-sm text-zinc-500">
          Products that need restocking
        </p>
      </div>

      <div className="space-y-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between rounded-xl border border-zinc-100 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-900">
                  {product.productName}
                </p>

                <p className="text-sm text-zinc-500">
                  Stock remaining
                </p>
              </div>

              <span
                className={`ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  product.stock <= 2
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {product.stock} left
              </span>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-zinc-500">
            No low stock products
          </p>
        )}
      </div>
    </div>
  );
};

export default LowStock;