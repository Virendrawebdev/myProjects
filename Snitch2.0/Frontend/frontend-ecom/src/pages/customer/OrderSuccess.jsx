import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✓
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-zinc-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Your payment was successful and your order has been confirmed.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            to="/customer/orders"
            className="block w-full rounded-full bg-zinc-900 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            View My Orders
          </Link>

          <Link
            to="/customer/CustomerProducts"
            className="block w-full rounded-full border border-zinc-300 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;