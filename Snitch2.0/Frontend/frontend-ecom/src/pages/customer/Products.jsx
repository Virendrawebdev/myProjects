import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product.api";
import CustomerHeader from "../../components/customer/CustomerHeader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        console.log("Customer products:", response);
        setProducts(response.data || []);
      } catch (error) {
        console.error("Products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <CustomerHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Products
            </h1>
          </div>

          {loading && (
            <p className="mt-6 text-zinc-500">Loading products...</p>
          )}

          {!loading && products.length === 0 && (
            <p className="mt-6 text-zinc-500">No products found.</p>
          )}

          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    <div className="relative aspect-square overflow-hidden bg-zinc-100">
                      <img
                        src={product.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"}
                        alt={product.productName}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        aria-label="Add to wishlist"
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:scale-105"
                      >
                        ♡
                      </button>
                    </div>

                    <div className="space-y-2 p-3 sm:p-4">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">
                        {product.brand || "Brand"}
                      </p>

                      <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-zinc-900 sm:text-[15px]">
                        {product.productName}
                      </h2>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base font-semibold text-zinc-900">
                          ₹{product.discountPrice || product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`rounded-lg px-4 py-2 text-sm ${
                        currentPage === index + 1
                          ? "bg-zinc-900 text-white"
                          : "border border-zinc-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};


export default Products;