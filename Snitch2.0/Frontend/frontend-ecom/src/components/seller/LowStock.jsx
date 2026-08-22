const products = [
  {
    name: "Running Shoes",
    category: "Footwear",
    stock: 2,
  },
  {
    name: "Oversized T-Shirt",
    category: "Clothing",
    stock: 4,
  },
  {
    name: "Denim Jacket",
    category: "Jackets",
    stock: 5,
  },
];

const LowStock = () => {
  return (
    <div className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Low Stock
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Products that need your attention
        </p>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-zinc-100 p-3 transition hover:bg-zinc-50"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900">
                {product.name}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {product.category}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-red-600">
                {product.stock} left
              </p>

              <p className="text-xs text-zinc-400">
                Low stock
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStock;