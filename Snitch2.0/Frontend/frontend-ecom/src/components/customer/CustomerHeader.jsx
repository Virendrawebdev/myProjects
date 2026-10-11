import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AstroidIcon, LogOut, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { logoutUser } from "../../services/auth.api";

const CustomerHeader = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  const closeMenu = () => setIsMenuOpen(false);
  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query
      ? `/customer/CustomerProducts?search=${encodeURIComponent(query)}`
      : "/customer/CustomerProducts");
    closeMenu();
  };

  useEffect(() => {
    setSearchTerm(new URLSearchParams(location.search).get("search") || "");
  }, [location.search]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutUser();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      alert(
        error.response?.data?.message || "Logout failed"
      );
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/customer/CustomerProducts" className="shrink-0 text-xl font-bold tracking-tight text-zinc-900">
          SNITCH
        </Link>
        <form onSubmit={handleSearch} role="search" className="hidden min-w-0 max-w-64 flex-1 md:block">
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none transition focus:border-zinc-900"
          />
        </form>
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
          <Link to="/customer/ai-recommend" className="text-sm text-zinc-700 hover:text-black">
            AI Style
          </Link>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Link to="/customer/Cart">
            <button type="button" aria-label="Open cart" className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100">
              <ShoppingBag size={19} strokeWidth={1.8} />
            </button>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:px-4"
            title="Logout"
          >
            <LogOut size={16} strokeWidth={1.8} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
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

      <form onSubmit={handleSearch} role="search" className="border-t border-zinc-100 px-4 py-3 md:hidden">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-full border border-zinc-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-900"
          />
        </div>
      </form>

      {isMenuOpen && (
        <nav className="border-t border-zinc-100 px-4 py-2 md:hidden">
          <Link to="/customer/CustomerProducts" onClick={closeMenu} className="flex items-center gap-3 border-b border-zinc-100 py-3 text-sm text-zinc-800">
            <ShoppingBag size={17} /> Products
          </Link>
          <Link to="/customer/Wishlist" onClick={closeMenu} className="flex items-center gap-3 border-b border-zinc-100 py-3 text-sm text-zinc-800">
            <span className="w-4.25 text-center text-lg leading-none">&#9825;</span> Wishlist
          </Link>
          <Link to="/customer/orders" onClick={closeMenu} className="flex items-center gap-3 py-3 text-sm text-zinc-800">
            <UserRound size={17} /> Orders
          </Link>
          <Link to="/customer/ai-recommend" onClick={closeMenu} className="flex items-center gap-3 py-3 text-sm text-zinc-800">
            <AstroidIcon size={17} /> AI Style
          </Link>
        </nav>
      )}
    </header>
  );
};

export default CustomerHeader;