import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/product.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import { addToWishlist, getWishlist, removeFromWishlist } from "../../services/wishlist.api";
import { addToCart } from "../../services/cart.api";

const ProductDetails = () => {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [loading, setLoading] = useState(true);
    const [wishlistProductIds, setWishlistProductIds] = useState([]);

    const isWishlisted = product ? wishlistProductIds.includes(product._id) : false;

    const handleWishlist = async () => {
        if (!product) return;

        try {
            if (isWishlisted) {
                setWishlistProductIds((prev) => prev.filter((id) => id !== product._id));
                await removeFromWishlist(product._id);
            } else {
                setWishlistProductIds((prev) => [...prev, product._id]);
                await addToWishlist(product._id);
            }
        } catch (error) {
            setWishlistProductIds((prev) => {
                if (isWishlisted) return [...prev, product._id];
                return prev.filter((id) => id !== product._id);
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
        return <div className="p-6">Loading...</div>;
    }

    if (!product) {
        return <div className="p-6">Product not found</div>;
    }

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id, quantity);

            alert("Product added to cart 🛒");
        } catch (error) {
            console.error("Add to cart error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };

    return (
        <>
            <CustomerHeader />
            <div className="min-h-screen bg-zinc-50 p-4">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-4 md:grid-cols-2">

                        {/* Image */}
                        <div className="relative overflow-hidden rounded-2xl bg-white">
                            <img
                                src={product.images?.[0]}
                                alt={product.productName}
                                className="h-full max-h-[600px] min-h-[180px] w-full object-cover"
                            />
                            <button
                                type="button"
                                aria-label="Add to wishlist"
                                onClick={handleWishlist}
                                className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-sm transition hover:scale-105 ${isWishlisted ? "bg-red-100 text-red-500" : "bg-white text-zinc-700"}`}
                            >
                                {isWishlisted ? "♥" : "♡"}
                            </button>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-zinc-500">
                                {product.brand}
                            </p>


                            <h1 className="mt-1 text-3xl font-semibold text-zinc-900">
                                {product.productName}
                            </h1>

                            <p className="mt-2 text-2xl font-semibold text-zinc-900">
                                ₹{product.Price || product.price}
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-zinc-900">
                                ₹{product.discountPrice || product.price} Off
                            </p>

                            <p className="mt-2 leading-7 text-zinc-600">
                                {product.description}
                            </p>

                            {/* Size */}
                            <div className="mt-2">
                                <p className="mb-3 text-sm font-medium text-zinc-900">
                                    Select Size
                                </p>

                                <div className="flex gap-2">
                                    {["S", "M", "L", "XL"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSize(item)}
                                            className={`h-10 w-12 rounded-lg border text-sm font-medium ${size === item
                                                ? "border-zinc-900 bg-zinc-900 text-white"
                                                : "border-zinc-300 bg-white text-zinc-900"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mt-2">
                                <p className="mb-3 text-sm font-medium text-zinc-900">
                                    Quantity
                                </p>

                                <div className="flex w-fit items-center rounded-lg border border-zinc-300 bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2"
                                    >
                                        −
                                    </button>

                                    <span className="px-4">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setQuantity(Math.min(product.stock, quantity + 1))
                                        }
                                        className="px-4 py-2"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <p className="mt-2 text-sm text-zinc-500">
                                Stock: {product.stock}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button onClick={handleAddToCart} className="flex-1 rounded-full border border-zinc-900 bg-white px-6 py-3 font-medium text-zinc-900">
                                    Add to Cart
                                </button>

                                <button className="flex-1 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;

