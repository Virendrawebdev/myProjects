import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../services/wishlist.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import StorefrontFooter from "../../components/customer/StorefrontFooter";
import { Link } from "react-router-dom";

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
    return <><CustomerHeader /><main className="min-h-[60vh] bg-[#f7f7f4] p-8 text-center text-zinc-500">Loading your wishlist...</main><StorefrontFooter /></>;
  }

  return (
    <>
    <CustomerHeader/>
    <main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
      <div className="mb-7 rounded-3xl bg-[#e8eddb] px-5 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Saved for later</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Your wishlist</h1>
        <p className="mt-2 text-sm text-zinc-600">A little collection of things you love.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
          <p className="text-lg font-semibold text-zinc-900">Nothing saved just yet.</p>
          <p className="mt-2 text-sm text-zinc-500">Tap the heart on anything you like and it will be here.</p>
          <Link to="/customer/CustomerProducts" className="mt-5 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700">Discover products</Link>
        </div>
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
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/70 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.productName}
                  className="aspect-[4/4.6] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />

                <div className="p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
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
                    className="mt-3 w-full rounded-full border border-zinc-200 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
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
    </main>
    <StorefrontFooter />
    </>
  );
};

export default Wishlist;