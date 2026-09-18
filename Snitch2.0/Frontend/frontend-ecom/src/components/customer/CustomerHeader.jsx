import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";

const CustomerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/customer/CustomerProducts" className="shrink-0 text-xl font-bold tracking-tight text-zinc-900">
          SNITCH
        </Link>
        <div className="hidden min-w-0 max-w-64 flex-1 md:block">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none transition focus:border-zinc-900"
          />
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/customer/CustomerProducts" className="text-sm text-zinc-700 hover:text-black">
            Products
          </Link>

          <Link to="/customer/Wishlist" className="text-sm text-zinc-700 hover:text-black">
            Wishlist
          </Link>

          <Link to="/customer/orders" className="text-sm text-zinc-700 hover:text-black">
            Orders
          </Link>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <Link  to="/customer/Cart">
          <button type="button" aria-label="Open cart" className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100">
            <ShoppingBag size={19} strokeWidth={1.8} />
          </button>
         </Link>
          <button type="button" aria-label="Account" className="hidden h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm text-white sm:flex">
            V
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 md:hidden"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-100 px-4 py-3 md:hidden">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-full border border-zinc-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-900"
        />
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-zinc-100 px-4 py-2 md:hidden">
          <Link to="/customer/CustomerProducts" onClick={closeMenu} className="flex items-center gap-3 border-b border-zinc-100 py-3 text-sm text-zinc-800">
            <ShoppingBag size={17} /> Products
          </Link>
          <Link to="/customer/Wishlist" onClick={closeMenu} className="flex items-center gap-3 border-b border-zinc-100 py-3 text-sm text-zinc-800">
            <span className="w-[17px] text-center text-lg leading-none">&#9825;</span> Wishlist
          </Link>
          <Link to="/customer/orders" onClick={closeMenu} className="flex items-center gap-3 py-3 text-sm text-zinc-800">
            <UserRound size={17} /> Orders
          </Link>
        </nav>
      )}
    </header>
  );
};

export default CustomerHeader;