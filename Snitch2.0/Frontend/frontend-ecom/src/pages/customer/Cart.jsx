import React, { useEffect, useState } from "react";
import {
    getCart,
    updateCartQuantity,
    removeFromCart,
} from "../../services/cart.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
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
        return <div className="p-6">Loading...</div>;
    }

    return (
        <>
            <CustomerHeader />
            <div className="min-h-screen bg-zinc-50 p-4">
                <h1 className="text-2xl font-semibold text-zinc-900">
                    My Cart
                </h1>

                {cart.length === 0 ? (
                    <p className="mt-6 text-zinc-500">
                        Your cart is empty.
                    </p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex gap-4 rounded-2xl bg-white p-4"
                            >
                                <img
                                    src={item.product?.images?.[0]}
                                    alt={item.product?.productName}
                                    className="h-24 w-20 rounded-xl object-cover"
                                />

                                <div>
                                    <h2 className="font-medium">
                                        {item.product?.productName}
                                    </h2>

                                    <div className="mt-3 flex w-fit items-center rounded-lg border border-zinc-300">
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


                                    <div className="flex px-2 gap-2 items-center ">
                                        <p className="mt-2 font-semibold">
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

                )}
                <div className="mt-6 rounded-2xl bg-white p-5">
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-600">Total</span>
                        <span className="text-xl font-semibold text-zinc-900">
                            ₹{totalPrice}
                        </span>
                    </div>

                    <Link
                        to="/customer/checkout"
                        className="mt-4 block w-full rounded-full bg-zinc-900 py-3 text-center font-medium text-white"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>

        </>
    );
}

export default Cart