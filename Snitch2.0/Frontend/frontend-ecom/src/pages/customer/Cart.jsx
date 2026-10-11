import { useEffect, useState } from "react";
import {
    getCart,
    updateCartQuantity,
    removeFromCart,
} from "../../services/cart.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import StorefrontFooter from "../../components/customer/StorefrontFooter";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart();

                // console.log("Cart:", response);

                setCart(response.data?.products || []);
            } catch (error) {
                console.error("Cart error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);


    const handleQuantityChange = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            await updateCartQuantity(productId, quantity);

            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.product?._id === productId
                        ? { ...item, quantity }
                        : item
                )
            );
        } catch (error) {
            console.error("Quantity update error:", error);
        }
    };


    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId);

            setCart((prevCart) =>
                prevCart.filter(
                    (item) => item.product?._id !== productId
                )
            );
        } catch (error) {
            console.error("Remove cart error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );
        }
    };

    const totalPrice = cart.reduce((total, item) => {
        const price =
            item.product?.discountPrice || item.product?.price || 0;

        return total + price * item.quantity;
    }, 0);
    if (loading) {
        return <><CustomerHeader /><main className="min-h-[60vh] bg-[#f7f7f4] p-8 text-center text-zinc-500">Loading your bag...</main><StorefrontFooter /></>;
    }

    return (
        <>
            <CustomerHeader />
            <main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                <div className="mb-7 rounded-3xl bg-[#e8eddb] px-5 py-6 sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Almost yours</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Your shopping bag</h1>
                    <p className="mt-2 text-sm text-zinc-600">{cart.length} {cart.length === 1 ? "piece" : "pieces"} picked for you</p>
                </div>

                {cart.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
                        <p className="text-lg font-semibold text-zinc-900">Your bag is waiting for something good.</p>
                        <p className="mt-2 text-sm text-zinc-500">Explore the collection and find a new favourite.</p>
                        <Link to="/customer/CustomerProducts" className="mt-5 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700">Explore products</Link>
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex gap-4 rounded-2xl border border-zinc-200/70 bg-white p-3 shadow-sm sm:p-4"
                            >
                                <img
                                    src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80"}
                                    alt={item.product?.productName}
                                    className="h-28 w-24 rounded-xl bg-zinc-100 object-cover sm:h-32 sm:w-28"
                                />

                                <div className="flex min-w-0 flex-1 flex-col">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{item.product?.brand}</p>
                                    <h2 className="mt-1 font-semibold text-zinc-900">
                                        {item.product?.productName}
                                    </h2>

                                    <div className="mt-3 flex w-fit items-center rounded-full border border-zinc-200">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.product?._id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="px-3 py-1"
                                        >
                                            −
                                        </button>

                                        <span className="px-3 text-sm">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.product?._id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-3 py-1"
                                        >
                                            +
                                        </button>
                                    </div>


                                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                                        <p className="font-semibold text-zinc-950">
                                            ₹
                                            {item.product?.discountPrice ||
                                                item.product?.price}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(item.product?._id)}
                                            className="mt-3 text-sm font-medium  text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                </div>

                            </div>

                        ))}
                    </div>

                <div className="h-fit rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-zinc-900">Order summary</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-600">Total</span>
                        <span className="text-xl font-semibold text-zinc-900">
                            ₹{totalPrice}
                        </span>
                    </div>

                    <Link
                        to="/customer/checkout"
                        className="mt-4 block w-full rounded-full bg-zinc-900 py-3 text-center font-semibold text-white transition hover:bg-zinc-700"
                    >
                        Proceed to Checkout
                    </Link>
                    <Link to="/customer/CustomerProducts" className="mt-3 block text-center text-sm font-medium text-zinc-600 hover:text-zinc-950">Continue shopping</Link>
                </div>
                </div>
                )}
                </div>
            </main>
            <StorefrontFooter />

        </>
    );
}

export default Cart