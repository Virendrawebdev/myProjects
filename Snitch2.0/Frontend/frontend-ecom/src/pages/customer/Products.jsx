import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product.api";
import { addToWishlist, getWishlist, removeFromWishlist } from "../../services/wishlist.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import StorefrontFooter from "../../components/customer/StorefrontFooter";
import { useNavigate, useSearchParams } from "react-router-dom";


const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();
  const [products, setProducts] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsPerPage = 4;
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))];
  const searchedProducts = searchQuery
    ? products.filter((product) =>
      [product.productName, product.brand, product.category, product.description]
        .some((value) => value?.toLowerCase().includes(searchQuery))
    )
    : products;
  const filteredProducts = selectedCategory === "All"
    ? searchedProducts
    : searchedProducts.filter((product) => product.category === selectedCategory);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (safeCurrentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

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
        const wishlistPayload = response?.data?.data ?? response?.data ?? [];
        const wishlistItems = Array.isArray(wishlistPayload)
          ? wishlistPayload
          : wishlistPayload?.products ?? [];

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
    const handleWishlistChange = (event) => {
      const { productId, wishlisted } = event.detail || {};
      if (!productId) return;

      setWishlistProductIds((prev) => {
        if (wishlisted) {
          return prev.includes(productId) ? prev : [...prev, productId];
        }
        return prev.filter((id) => String(id) !== String(productId));
      });
    };

    window.addEventListener("wishlist:changed", handleWishlistChange);
    return () => window.removeEventListener("wishlist:changed", handleWishlistChange);
  }, []);

  const handleWishlistToggle = async (event, productId) => {
    event.stopPropagation();

    const isProductInWishlist = wishlistProductIds.includes(productId);

    try {
      if (isProductInWishlist) {
        setWishlistProductIds((prev) => prev.filter((id) => id !== productId));
        window.dispatchEvent(
          new CustomEvent("wishlist:changed", {
            detail: { productId: String(productId), wishlisted: false },
          })
        );
        await removeFromWishlist(productId);
      } else {
        setWishlistProductIds((prev) => [...prev, productId]);
        window.dispatchEvent(
          new CustomEvent("wishlist:changed", {
            detail: { productId: String(productId), wishlisted: true },
          })
        );
        await addToWishlist(productId);
      }
    } catch (error) {
      setWishlistProductIds((prev) => {
        if (isProductInWishlist) return [...prev, productId];
        return prev.filter((id) => id !== productId);
      });
      console.error("Wishlist toggle error:", error);
    }
  };

  return (
    <>
      <CustomerHeader />
      <main className="min-h-[calc(100vh-4rem)] bg-[#f7f7f4] px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 overflow-hidden rounded-3xl bg-[#e8eddb] px-5 py-7 sm:px-9 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">The everyday edit</p>
            <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                  Find your next favourite.
                </h1>
                <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-600 sm:text-base">
                  Fresh picks, easy essentials, and styles worth keeping.
                </p>
              </div>
              <span className="w-fit rounded-full bg-white/75 px-4 py-2 text-sm font-medium text-zinc-700">
                {products.length} {products.length === 1 ? "piece" : "pieces"} to explore
              </span>
            </div>
          </div>

          {loading && (
            <p className="mt-6 text-zinc-500">Loading products...</p>
          )}

          {!loading && products.length === 0 && (
            <p className="mt-6 text-zinc-500">No products found.</p>
          )}

          {!loading && products.length > 0 && (
            <>
              {searchQuery && (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-600">
                  <p>
                    {filteredProducts.length
                      ? `${filteredProducts.length} result${filteredProducts.length === 1 ? "" : "s"} for “${searchParams.get("search")}”`
                      : `No results for “${searchParams.get("search")}”`}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/customer/CustomerProducts")}
                    className="font-semibold text-zinc-900 underline underline-offset-4"
                  >
                    Clear search
                  </button>
                </div>
              )}
              <div className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="Filter products by category">
                {["All", ...categories].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    aria-pressed={selectedCategory === category}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedCategory === category
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredProducts.length === 0 ? (
                <p className="rounded-2xl bg-white p-6 text-sm text-zinc-500">
                  {searchQuery
                    ? "Try another search term or clear your search to browse all products."
                    : "No items in this category just yet. Try another category."}
                </p>
              ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {currentProducts.map((product) => {
                  const isWishlisted = wishlistProductIds.some((id) => String(id) === String(product._id));
                  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
                  const discountPercent = hasDiscount
                    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                    : 0;
                  const openProductDetails = () => {
                    navigate(`/customer/product/${product._id}`);
                  };

                  return (
                    <div
                      key={product._id}
                      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10"
                    >
                      <div
                        className="relative aspect-[4/4.6] cursor-pointer overflow-hidden bg-zinc-100"
                        onClick={openProductDetails}
                      >
                        <img
                          src={product.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"}
                          alt={product.productName}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        {hasDiscount && (
                          <span className="absolute left-3 top-3 rounded-full bg-[#e2f163] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-900">
                            Save {discountPercent}%
                          </span>
                        )}
                        {!hasDiscount && product.stock > 0 && product.stock <= 5 && (
                          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-zinc-800">
                            Almost gone
                          </span>
                        )}
                        <button
                          type="button"
                          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          onClick={(event) => handleWishlistToggle(event, product._id)}
                          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-sm transition hover:scale-105 ${isWishlisted ? "bg-red-100 text-red-500" : "bg-white/95 text-zinc-700"
                            }`}
                        >
                          {isWishlisted ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="space-y-2 p-3 sm:p-4">
                        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                          {product.brand || product.category || "SNITCH edit"}
                        </p>
                        <h2
                          className="line-clamp-2 min-h-[2.5rem] cursor-pointer text-sm font-semibold text-zinc-900 sm:text-[15px]"
                          onClick={openProductDetails}
                        >
                          {product.productName}
                        </h2>
                        {product.ratings > 0 && (
                          <p className="text-xs text-amber-600">
                            ★ {Number(product.ratings).toFixed(1)}
                            {product.totalReviews > 0 && <span className="ml-1 text-zinc-400">({product.totalReviews})</span>}
                          </p>
                        )}
                        <div className="flex min-h-6 flex-wrap items-baseline gap-x-2">
                          <p className="text-base font-bold text-zinc-950">
                            ₹{hasDiscount ? product.discountPrice : product.price}
                          </p>
                          {hasDiscount && (
                            <p className="text-xs text-zinc-400 line-through">₹{product.price}</p>
                          )}
                          {product.stock === 0 && <span className="text-xs font-medium text-red-600">Sold out</span>}
                        </div>
                        <button
                          type="button"
                          onClick={openProductDetails}
                          disabled={product.stock === 0}
                          className="mt-1 w-full rounded-xl bg-zinc-900 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:text-sm"
                        >
                          {product.stock === 0 ? "Currently unavailable" : "Explore this piece"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={safeCurrentPage === 1}
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`rounded-lg px-4 py-2 text-sm $                      {safeCurrentPage === index + 1
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-200"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={safeCurrentPage === totalPages}
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
      <StorefrontFooter />
    </>
  );
};


export default Products;