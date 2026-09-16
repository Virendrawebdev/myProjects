import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product.api";
import { addToWishlist, getWishlist, removeFromWishlist } from "../../services/wistlist.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
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
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();
        const wishlistItems = response?.data?.products || response?.data || [];
        const ids = wishlistItems.map((item) => {
          if (typeof item === "string") return item;
          return item?.product?._id || item?.product;
        });
        setWishlistProductIds(ids.filter(Boolean));
      } catch (error) {
        console.error("Wishlist fetch error:", error);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleWishlistToggle = async (event, productId) => {
    event.stopPropagation();

    const isProductInWishlist = wishlistProductIds.includes(productId);

    try {
      if (isProductInWishlist) {
        await removeFromWishlist(productId);
        setWishlistProductIds((prev) => prev.filter((id) => id !== productId));
      } else {
        await addToWishlist(productId);
        setWishlistProductIds((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
    }
  };

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
                {currentProducts.map((product) => {
                  const isWishlisted = wishlistProductIds.includes(product._id);
                  const openProductDetails = () => {
                    navigate(`/customer/product/${product._id}`);
                  };

                  return (
                    <div
                      key={product._id}
                      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100"
                    >
                      <div
                        className="relative aspect-square cursor-pointer overflow-hidden bg-zinc-100"
                        onClick={openProductDetails}
                      >
                        <img
                          src={product.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"}
                          alt={product.productName}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <button
                          type="button"
                          aria-label="Add to wishlist"
                          onClick={(event) => handleWishlistToggle(event, product._id)}
                          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-sm transition hover:scale-105 ${isWishlisted ? "bg-red-100 text-red-500" : "bg-white text-zinc-700"
                            }`}
                        >
                          {isWishlisted ? "♥" : "♡"}
                        </button>
                      </div>

                      <div
                        className="cursor-pointer space-y-2 p-3 sm:p-4"
                        onClick={openProductDetails}
                      >
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
                  );
                })}
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
                      className={`rounded-lg px-4 py-2 text-sm ${currentPage === index + 1
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