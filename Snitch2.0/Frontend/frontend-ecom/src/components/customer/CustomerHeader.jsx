import React from "react";

const CustomerHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          SNITCH
        </h1>
        <div className="hidden w-64 md:block">
  <input
    type="text"
    placeholder="Search products..."
    className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-900"
  />
</div>
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="/customer/CustomerProducts" className="text-sm text-zinc-700 hover:text-black">
            Products
          </a>

          <a href="/wishlist" className="text-sm text-zinc-700 hover:text-black">
            Wishlist
          </a>

          <a href="/customer/orders" className="text-sm text-zinc-700 hover:text-black">
            Orders
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-lg">♡</button>
          <button className="text-lg">🛒</button>
          <button className="h-9 w-9 rounded-full bg-zinc-900 text-sm text-white">
            V
          </button>
        </div>
      </div>
      <div className="border-t border-zinc-100 px-4 py-3 md:hidden">
  <input
    type="text"
    placeholder="Search products..."
    className="w-full rounded-full border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-zinc-900"
  />
</div>
    </header>
  );
};

export default CustomerHeader;