import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    createPayment,
    markPaymentSuccess,
    confirmOrderAfterPayment,
} from "../../services/payment.api";
import CustomerHeader from "../../components/customer/CustomerHeader";
import StorefrontFooter from "../../components/customer/StorefrontFooter";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const orderId = location.state?.orderId;


    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod]=useState("Mock")

    const handlePayment = async () => {
        if (!orderId) {
            alert("Order not found");
            return;
        }

        try {
            setLoading(true);

            // 1. Create payment
            const paymentResponse = await createPayment(orderId);
            const paymentId = paymentResponse.data?._id ?? paymentResponse._id;

            if (!paymentId) {
                throw new Error("Payment ID was not returned by the server");
            }

            // 2. Mock payment success
            await markPaymentSuccess(paymentId);

            // 3. Confirm order
            await confirmOrderAfterPayment(paymentId);

            alert("Payment successful 🎉");

            navigate("/customer/order-success");
        } catch (error) {
            console.error("Payment error:", error);

            alert(
                error.response?.data?.message ||
                "Payment failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <CustomerHeader />
        <main className="min-h-[60vh] bg-[#f7f7f4] px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-2xl">

                <Link
                    to="/customer/checkout"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
                >
                    ← Back to Checkout
                </Link>
            

                <div className="mb-6 rounded-3xl bg-[#e8eddb] px-5 py-6 sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Almost there</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Payment</h1>
                    <p className="mt-2 text-sm text-zinc-600">Choose how you would like to pay.</p>
                </div>

                <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm sm:p-7">
                    <h2 className="text-lg font-medium text-zinc-900">
                        Select Payment Method
                    </h2>
                    <div className="mt-5 space-y-3">

                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === "COD" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-400"}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <div>
                                <p className="font-medium text-zinc-900">
                                    Cash on Delivery
                                </p>
                                <p className="text-sm text-zinc-500">
                                    Pay when your order arrives
                                </p>
                            </div>
                        </label>

                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === "Online" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-400"}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="Online"
                                checked={paymentMethod === "Online"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <div>
                                <p className="font-medium text-zinc-900">
                                    Online Payment
                                </p>
                                <p className="text-sm text-zinc-500">
                                    Pay online
                                </p>
                            </div>
                        </label>

                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === "Mock" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-400"}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="Mock"
                                checked={paymentMethod === "Mock"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <div>
                                <p className="font-medium text-zinc-900">
                                    Mock Payment
                                </p>
                                <p className="text-sm text-zinc-500">
                                    Test payment for development
                                </p>
                            </div>
                        </label>

                    </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-6 w-full rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </div>
            </div>

        </main>
        <StorefrontFooter />
        </>
  );
};

export default Payment;