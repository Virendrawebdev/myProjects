import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/order.api"


const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await placeOrder(
      address,
      "Mock"
    );

    const orderId = response.data._id;

        navigate("/customer/payment", {
      state: { orderId },
    });
  } catch (error) {
    console.error("Place order error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to place order"
    );
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="min-h-screen bg-zinc-50 p-3">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/customer/cart"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
                >
                    ← Back to Cart
                </Link>
                <h1 className="text-2xl font-semibold text-zinc-900">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mt-6 rounded-2xl bg-white p-5">
                        <h2 className="text-lg font-medium text-zinc-900">
                            Delivery Address
                        </h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={address.fullName}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={address.phone}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="text"
                                name="addressLine"
                                placeholder="Address"
                                value={address.addressLine}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={address.city}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={address.state}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={address.pincode}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="mt-6 w-full rounded-full bg-zinc-900 py-3 font-medium text-white hover:bg-zinc-800"
                        >
                           {loading ? "Creating Order..." : "Continue to Payment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Checkout;