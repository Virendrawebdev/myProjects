import React, { useEffect, useState } from "react";
import { getSellerProducts } from "../../services/product.api";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // yahan existing product API connect karenge
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getSellerProducts();
        console.log("Fetched Products:", data);
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Products
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your products and inventory
        </p>
      </div>

      <div className="rounded-2xl border bg-white">
        {products.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-zinc-500">No products found</p>
          </div>
        ) : (
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
  {products.map((product) => (
    <div
      key={product._id}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
    >
      <div className="aspect-square bg-zinc-100">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.productName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="truncate font-medium text-zinc-900">
          {product.productName}
        </h2>

        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-zinc-900">
            ₹{product.price}
          </p>

          <p
            className={`text-sm ${
              product.stock <= 5 ? "text-red-500" : "text-zinc-500"
            }`}
          >
            {product.stock} left
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium">
            Edit
          </button>

          <button className="flex-1 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </div>
  );
};

export default Products;