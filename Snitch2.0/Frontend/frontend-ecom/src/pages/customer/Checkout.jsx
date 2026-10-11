import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/order.api"
import CustomerHeader from "../../components/customer/CustomerHeader";
import StorefrontFooter from "../../components/customer/StorefrontFooter";


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
        <>
        <CustomerHeader />
        <main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/customer/cart"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
                >
                    ← Back to Cart
                </Link>
                <div className="mb-6 rounded-3xl bg-[#e8eddb] px-5 py-6 sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">One last step</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Checkout</h1>
                    <p className="mt-2 text-sm text-zinc-600">Where should we send your order?</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm sm:p-7">
                        <h2 className="text-lg font-medium text-zinc-900">
                            Delivery Address
                        </h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                aria-label="Full Name"
                                required
                                value={address.fullName}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                aria-label="Phone Number"
                                required
                                value={address.phone}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="text"
                                name="addressLine"
                                placeholder="Address"
                                aria-label="Address"
                                required
                                value={address.addressLine}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                aria-label="City"
                                required
                                value={address.city}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                aria-label="State"
                                required
                                value={address.state}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                aria-label="Pincode"
                                required
                                pattern="[0-9]{6}"
                                value={address.pincode}
                                onChange={handleChange}
                                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="mt-6 w-full rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                           {loading ? "Creating Order..." : "Continue to Payment"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
        <StorefrontFooter />
        </>
    );
};

export default Checkout;