import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../services/wishlist.api";
import CustomerHeader from "../../components/customer/CustomerHeader";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();
        const wishlistPayload = response?.data?.data ?? response?.data ?? [];
        const wishlistItems = Array.isArray(wishlistPayload)
          ? wishlistPayload
          : wishlistPayload?.products ?? [];

        setWishlist(wishlistItems);
      } catch (error) {
        console.error("Wishlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);

      setWishlist((prev) => prev.filter((item) => {
        const itemProductId = item.product?._id || item.product;
        return String(itemProductId) !== String(productId);
      }));
      window.dispatchEvent(
        new CustomEvent("wishlist:changed", {
          detail: { productId: String(productId), wishlisted: false },
        })
      );
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
    <CustomerHeader/>
    <div className="min-h-screen bg-zinc-50 p-4">
      <h1 className="text-2xl font-semibold text-zinc-900">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="mt-6 text-zinc-500">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {wishlist.map((item) => {
            const product = item.product;

            if (!product || typeof product !== "object") {
              return null;
            }

            return (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.productName}
                  className="aspect-square w-full object-cover"
                />

                <div className="p-3">
                  <p className="text-xs text-zinc-500">
                    {product.brand}
                  </p>

                  <h2 className="mt-1 truncate font-medium">
                    {product.productName}
                  </h2>

                  <p className="mt-2 font-semibold">
                    ₹{product.discountPrice || product.price}
                  </p>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="mt-3 w-full rounded-full bg-red-100 py-2 text-sm font-medium text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
};

export default Wishlist;