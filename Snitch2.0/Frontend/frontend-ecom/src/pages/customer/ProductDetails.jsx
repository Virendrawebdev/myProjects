import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/product.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import StorefrontFooter from "../../components/customer/StorefrontFooter";
import { addToWishlist, getWishlist, removeFromWishlist } from "../../services/wishlist.api";
import { addToCart } from "../../services/cart.api";

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [cartAction, setCartAction] = useState("");
    const [cartFeedback, setCartFeedback] = useState(null);
    const [wishlistProductIds, setWishlistProductIds] = useState([]);

    const isWishlisted = product
        ? wishlistProductIds.some((id) => String(id) === String(product._id))
        : false;
    const hasDiscount = product?.discountPrice > 0 && product.discountPrice < product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price || 0);

    const handleWishlist = async () => {
        if (!product) return;

        try {
            if (isWishlisted) {
                setWishlistProductIds((prev) => prev.filter((id) => String(id) !== String(product._id)));
                await removeFromWishlist(product._id);
            } else {
                setWishlistProductIds((prev) => [...prev, product._id]);
                await addToWishlist(product._id);
            }
            window.dispatchEvent(
                new CustomEvent("wishlist:changed", {
                    detail: { productId: String(product._id), wishlisted: !isWishlisted },
                })
            );
        } catch (error) {
            setWishlistProductIds((prev) => {
                if (isWishlisted) return [...prev, product._id];
                return prev.filter((id) => String(id) !== String(product._id));
            });
            console.error("Wishlist error:", error);
            alert(
                error.response?.data?.message || "Failed to update wishlist"
            );
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                // console.log("Product details:", response);

                setProduct(response.data);
            } catch (error) {
                console.error("Product details error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await getWishlist();
                const wishlistPayload = response?.data?.data ?? response?.data ?? [];
                const wishlistItems = Array.isArray(wishlistPayload)
                    ? wishlistPayload
                    : wishlistPayload?.products ?? [];

                const ids = wishlistItems
                    .map((item) => {
                        if (typeof item === "string") return item;
                        return item?.product?._id || item?.product;
                    })
                    .filter(Boolean);

                setWishlistProductIds(ids);
            } catch (error) {
                console.error("Wishlist fetch error:", error);
            }
        };

        fetchWishlist();
    }, []);

    useEffect(() => {
        const handleWishlistChange = (event) => {
            const { productId, wishlisted } = event.detail || {};
            if (!productId || productId !== String(product?._id)) return;

            setWishlistProductIds((prev) => {
                if (wishlisted) {
                    return prev.includes(productId) ? prev : [...prev, productId];
                }
                return prev.filter((id) => String(id) !== productId);
            });
        };

        window.addEventListener("wishlist:changed", handleWishlistChange);
        return () => window.removeEventListener("wishlist:changed", handleWishlistChange);
    }, [product?._id]);

    if (loading) {
        return (
            <>
                <CustomerHeader />
                <main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-10 sm:px-6">
                    <div className="mx-auto grid max-w-6xl animate-pulse gap-6 md:grid-cols-2">
                        <div className="aspect-[4/4.6] rounded-3xl bg-zinc-200" />
                        <div className="space-y-4 py-6">
                            <div className="h-4 w-24 rounded bg-zinc-200" />
                            <div className="h-9 w-3/4 rounded bg-zinc-200" />
                            <div className="h-7 w-32 rounded bg-zinc-200" />
                            <div className="h-24 rounded bg-zinc-200" />
                        </div>
                    </div>
                </main>
                <StorefrontFooter />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <CustomerHeader />
                <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f4] px-4 py-10">
                    <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 text-center">
                        <h1 className="text-xl font-semibold text-zinc-900">We couldn't find that piece.</h1>
                        <p className="mt-2 text-sm text-zinc-500">It may have been removed or is no longer available.</p>
                        <button
                            type="button"
                            onClick={() => navigate("/customer/CustomerProducts")}
                            className="mt-5 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
                        >
                            Browse all products
                        </button>
                    </div>
                </main>
                <StorefrontFooter />
            </>
        );
    }

    const handleAddToCart = async (buyNow = false) => {
        setCartAction(buyNow ? "buy" : "add");
        setCartFeedback(null);
        try {
            await addToCart(product._id, quantity);
            if (buyNow) {
                navigate("/customer/checkout");
                return;
            }
            setCartFeedback({ type: "success", message: "Added to your bag." });
        } catch (error) {
            console.error("Add to cart error:", error);
            setCartFeedback({
                type: "error",
                message: error.response?.data?.message || "Couldn't add this item. Please try again.",
            });
        } finally {
            setCartAction("");
        }
    };

    return (
        <>
            <CustomerHeader />
            <main className="min-h-[60vh] overflow-x-clip bg-[#f7f7f4] px-4 py-6 sm:px-6 sm:py-10">
                <div className="mx-auto min-w-0 max-w-6xl">
                    <button
                        type="button"
                        onClick={() => navigate("/customer/CustomerProducts")}
                        className="mb-5 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
                    >
                        ← Back to collection
                    </button>
                    <div className="grid min-w-0 gap-5 sm:gap-6 md:grid-cols-2 md:gap-10">
                        <div className="relative aspect-[4/4.6] min-w-0 overflow-hidden rounded-3xl bg-white shadow-sm">
                            <img
                                src={product.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"}
                                alt={product.productName}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {hasDiscount && (
                                <span className="absolute left-4 top-4 rounded-full bg-[#e2f163] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-900">
                                    Save {discountPercent}%
                                </span>
                            )}
                            <button
                                type="button"
                                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                onClick={handleWishlist}
                                className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-xl shadow-sm transition hover:scale-105 ${isWishlisted ? "bg-red-100 text-red-500" : "bg-white text-zinc-700"}`}
                            >
                                {isWishlisted ? "♥" : "♡"}
                            </button>
                        </div>

                        <div className="flex min-w-0 flex-col justify-center rounded-3xl border border-zinc-200/70 bg-white p-4 shadow-sm sm:p-8">
                            <p className="break-words text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                {product.brand || "SNITCH"}{product.category ? ` · ${product.category}` : ""}
                            </p>
                            <h1 className="mt-3 break-words text-2xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                                {product.productName}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-baseline gap-3">
                                <p className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                                    ₹{formatPrice(hasDiscount ? product.discountPrice : product.price)}
                                </p>
                                {hasDiscount && (
                                    <>
                                        <p className="text-lg text-zinc-400 line-through">₹{formatPrice(product.price)}</p>
                                        <p className="text-sm font-semibold text-emerald-700">You save ₹{formatPrice(product.price - product.discountPrice)}</p>
                                    </>
                                )}
                            </div>

                            <p className="mt-5 break-words leading-7 text-zinc-600">
                                {product.description}
                            </p>

                            <div className="mt-6 flex min-w-0 flex-wrap items-center justify-between gap-4 border-y border-zinc-100 py-5">
                                <div>
                                    <p className="mb-2 text-sm font-medium text-zinc-900">
                                    Quantity
                                    </p>
                                    <div className="flex w-fit items-center rounded-full border border-zinc-200 bg-white">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                        disabled={quantity <= 1 || product.stock < 1}
                                        className="h-10 w-10 rounded-full text-lg transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        −
                                    </button>

                                    <span aria-live="polite" className="min-w-8 text-center text-sm font-medium">
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
                                        disabled={quantity >= product.stock}
                                        className="h-10 w-10 rounded-full text-lg transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        +
                                    </button>
                                    </div>
                                </div>

                                <p className={`break-words text-sm font-medium ${product.stock > 0 ? "text-emerald-700" : "text-red-600"}`}>
                                    {product.stock > 0 ? `${product.stock} available` : "Currently out of stock"}
                                </p>
                            </div>

                            <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(false)}
                                    disabled={product.stock < 1 || Boolean(cartAction)}
                                    className="min-h-12 min-w-0 whitespace-normal break-words rounded-full border border-zinc-300 bg-white px-5 py-3 font-semibold text-zinc-900 transition hover:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {cartAction === "add" ? "Adding..." : "Add to bag"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(true)}
                                    disabled={product.stock < 1 || Boolean(cartAction)}
                                    className="min-h-12 min-w-0 whitespace-normal break-words rounded-full bg-zinc-900 px-5 py-3 font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {cartAction === "buy" ? "Opening bag..." : "Buy now"}
                                </button>
                            </div>
                            {cartFeedback && (
                                <p
                                    role={cartFeedback.type === "error" ? "alert" : "status"}
                                    className={`mt-3 break-words text-sm ${cartFeedback.type === "error" ? "text-red-600" : "text-emerald-700"}`}
                                >
                                    {cartFeedback.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <StorefrontFooter />
        </>
    );
};

export default ProductDetails;
